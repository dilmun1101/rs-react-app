import { Component } from 'react';
import SearchForm from '../../shared/ui/search-form/SearchForm';
import CardsContainer from '../../shared/ui/cards-container/CardsContainer';
import { scryfallService } from '../../api/service/service';
import {
  getSavedSearchQuery,
  saveSearchQuery,
} from '../../shared/utils/storage';
import { UI_MESSAGES } from '../../shared/constants/messages';
import Card from '../../shared/ui/card/Card';

interface ScryfallCard {
  id: string;
  name: string;
  oracle_text: string;
  image_uris?: {
    small?: string;
    normal?: string;
  };
}

interface IMainPageState {
  items: ScryfallCard[];
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  searchQuery: string;
  hasMore: boolean;
}

class MainPage extends Component<{}, IMainPageState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      items: [],
      isLoading: false,
      error: null,
      currentPage: 1,
      searchQuery: getSavedSearchQuery(),
      hasMore: false,
    };
  }

  componentDidMount() {
    this.fetchData(this.state.searchQuery, this.state.currentPage);
  }

  fetchData = async (query: string, page: number) => {
    this.setState({ isLoading: true, error: null });

    try {
      const response = await scryfallService.searchCards(query, page);

      this.setState({
        items: response.data,
        hasMore: response.has_more,
        isLoading: false,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : UI_MESSAGES.UNKNOWN_ERROR;
      this.setState({ error: errorMessage, isLoading: false, items: [] });
    }
  };

  handleSearch = (query: string) => {
    const searchText = query.trim();

    saveSearchQuery(searchText);

    this.setState({ searchQuery: searchText, currentPage: 1 }, () => {
      this.fetchData(searchText, 1);
    });
  };

  handleNextPage = () => {
    if (this.state.hasMore) {
      const nextPage = this.state.currentPage + 1;
      this.setState({ currentPage: nextPage }, () => {
        this.fetchData(this.state.searchQuery, nextPage);
      });
    }
  };

  handlePrevPage = () => {
    if (this.state.currentPage > 1) {
      const prevPage = this.state.currentPage - 1;
      this.setState({ currentPage: prevPage }, () => {
        this.fetchData(this.state.searchQuery, prevPage);
      });
    }
  };

  render() {
    const { items, isLoading, error, currentPage, hasMore } = this.state;

    return (
      <main className="main-page">
        <div className="top-controls">
          <SearchForm onSearch={this.handleSearch} />
        </div>

        <div className="content-area">
          {isLoading && <div className="loader">{UI_MESSAGES.LOADING}</div>}
          {error && <div className="error-message">Error: {error}</div>}

          {!isLoading && !error && (
            <CardsContainer
              onNextClick={this.handleNextPage}
              onPrevClick={this.handlePrevPage}
              isPrevDisabled={currentPage === 1}
              isNextDisabled={!hasMore}
            >
              {items && items.length > 0 ? (
                items.map((item) => (
                  <Card
                    key={item.id}
                    name={item.name}
                    description={item.oracle_text || UI_MESSAGES.NO_DESCRIPTION}
                    imageUrl={item.image_uris?.small}
                  />
                ))
              ) : (
                <p>{UI_MESSAGES.NO_RESULTS}</p>
              )}
            </CardsContainer>
          )}
        </div>
      </main>
    );
  }
}

export default MainPage;
