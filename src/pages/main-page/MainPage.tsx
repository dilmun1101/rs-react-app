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
import styles from './main-page.module.scss';
import type { CardItem } from '../../shared/constants/types';

interface IMainPageState {
  items: CardItem[];
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  searchQuery: string;
  hasMore: boolean;
}

class MainPage extends Component<never, IMainPageState> {
  constructor(props: never) {
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
    void this.fetchData(this.state.searchQuery, this.state.currentPage);
  }

  fetchData = async (query: string, page: number) => {
    this.setState({ isLoading: true, error: null });

    try {
      const response = await scryfallService.searchCards(query, page);

      this.setState({
        items: response.items,
        hasMore: response.hasMore,
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
      void this.fetchData(searchText, 1);
    });
  };

  // handleNextPage = () => {
  //   if (this.state.hasMore) {
  //     const nextPage = this.state.currentPage + 1;
  //     this.setState({ currentPage: nextPage }, () => {
  //     this.fetchData(this.state.searchQuery, nextPage);
  //     });
  //   }
  // };

  // handlePrevPage = () => {
  //   if (this.state.currentPage > 1) {
  //     const prevPage = this.state.currentPage - 1;
  //     this.setState({ currentPage: prevPage }, () => {
  //       this.fetchData(this.state.searchQuery, prevPage);
  //     });
  //   }
  // };

  render() {
    const { items, isLoading, error, currentPage, hasMore } = this.state;

    return (
      <main className={styles.mainPage}>
        <div className={styles.topControls}>
          <SearchForm onSearch={this.handleSearch} />
        </div>

        <div className={styles.contentArea}>
          {isLoading && <div className="loader">{UI_MESSAGES.LOADING}</div>}
          {error && <div className={styles.errorMessage}>Error: {error}</div>}

          {!isLoading && !error && (
            <CardsContainer
              isPrevDisabled={currentPage === 1}
              isNextDisabled={!hasMore}
            >
              {items.length > 0 ? (
                items.map((item) => (
                  <Card
                    key={item.id}
                    name={item.name}
                    description={item.description}
                    imageUrl={item.imageUrl}
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
