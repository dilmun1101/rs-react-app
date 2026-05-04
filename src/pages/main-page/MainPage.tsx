import { Component } from 'react';
import SearchForm from '../../shared/ui/search-form/SearchForm';
import CardsContainer from '../../shared/ui/cards-container/CardsContainer';
import { scryfallService } from '../../api/service/scryfall-service';
import {
  getSavedSearchQuery,
  saveSearchQuery,
} from '../../shared/utils/storage';
import { UI_MESSAGES } from '../../shared/constants/messages';
import styles from './main-page.module.scss';
import type { CardItem } from '../../shared/constants/types';
import ErrorTest from '../../shared/ui/error-test/ErrorTest';
import CardsSkeletonLoader from '../../shared/ui/card-skeleton-loader/CardSkeletonLoader';
import { chunkArrayCards } from '../../shared/utils/chunk-array-cards';
import CardRowSlider from '../../shared/ui/cards-row-slider/CardRowSlider';

interface IMainPageState {
  items: CardItem[];
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  searchQuery: string;
  hasMore: boolean;
}

class MainPage extends Component<unknown, IMainPageState> {
  constructor(props: unknown) {
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
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : UI_MESSAGES.UNKNOWN_ERROR;
      this.setState({ error: errorMessage, items: [] });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSearch = (query: string) => {
    const searchText = query.trim();

    saveSearchQuery(searchText);

    this.setState({ searchQuery: searchText, currentPage: 1 }, () => {
      void this.fetchData(searchText, 1);
    });
  };

  handleQueryChange = (value: string) => {
    this.setState({ searchQuery: value });
  };

  render() {
    const { items, isLoading, error } = this.state;
    const sliderRows = chunkArrayCards<CardItem>(items, 4);

    return (
      <main className={styles.mainPage}>
        <div className={styles.topControls}>
          <div className={styles.topControlsWrapper}>
            <SearchForm
              query={this.state.searchQuery}
              onQueryChange={this.handleQueryChange}
              onSearch={this.handleSearch}
            />
            <ErrorTest />
          </div>
        </div>
        <div className={styles.contentArea}>
          <div className={styles.contentAreaWrapper}>
            {error && <div className={styles.errorMessage}>Error: {error}</div>}

            {!error && (
              <>
                {isLoading ? (
                  <CardsSkeletonLoader count={10} />
                ) : sliderRows.length > 0 ? (
                  <CardsContainer>
                    {sliderRows.map((rowCards, rowIndex) => (
                      <CardRowSlider
                        key={`row-${String(rowIndex)}`}
                        cards={rowCards}
                        rowIndex={rowIndex}
                      />
                    ))}
                  </CardsContainer>
                ) : (
                  <p>{UI_MESSAGES.NO_RESULTS}</p>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    );
  }
}

export default MainPage;
