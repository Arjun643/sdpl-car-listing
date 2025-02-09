declare module 'react-js-pagination' {
  interface Props {
    activePage: number;
    itemsCountPerPage: number;
    totalItemsCount: number;
    pageRangeDisplayed: number;
    onChange: (pageNumber: number) => void;
    innerClass?: string;
    itemClass?: string;
    activeClass?: string;
    disabledClass?: string;
    linkClass?: string;
    firstPageText?: React.ReactNode;
    lastPageText?: React.ReactNode;
    prevPageText?: React.ReactNode;
    nextPageText?: React.ReactNode;
  }

  export default function Pagination(props: Props): JSX.Element;
} 