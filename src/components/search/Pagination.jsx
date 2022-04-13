import {
  searchResultCurrentPageZeroIndexAtom,
  searchResultPageCountAtom,
  searchResultPageSizeAtom,
  searchResultsCountAtom,
  searchResultsTermAtom,
} from '@/src/store'
import { useRouter } from 'next/router'
import cls from 'classnames'
import ReactPaginate from 'react-paginate'
import { useAtomValue } from 'jotai/utils'
import { useTranslation } from 'next-i18next'
import getConfig from 'next/config'

const pageUrl = ({ page, q }) => {
  const { SEARCH_PAGE_PATH,SITE_HOST } = getConfig().publicRuntimeConfig
  const url = new URL(SEARCH_PAGE_PATH,SITE_HOST)

  url.searchParams.set('search', q)
  url.searchParams.set('page', page)
  const { pathname, search } = url
  return `${pathname}${search}`
}

const Pagination = ({ className }) => {
  const { t } = useTranslation('common')
  const { push } = useRouter()
  const searchCount = useAtomValue(searchResultsCountAtom)
  const q = useAtomValue(searchResultsTermAtom)
  const pageSize = useAtomValue(searchResultPageSizeAtom)
  const currentPage = useAtomValue(searchResultCurrentPageZeroIndexAtom)
  const pageCount = useAtomValue(searchResultPageCountAtom)

  const pageUrlWithSearchTerm = (page) => pageUrl({ page, q })
  const changePage = ({ selected }) =>
    push({ query: { search: q, page: selected + 1 } })

  if (pageSize > searchCount) {
    return null
  }

  return (
    <div className={className}>
      <ReactPaginate
        breakLabel="..."
        nextLabel={t('search.next')}
        previousLabel={t('search.prev')}
        hrefBuilder={pageUrlWithSearchTerm}
        pageCount={pageCount}
        pageRangeDisplayed={5}
        forcePage={currentPage}
        onPageChange={changePage}
        renderOnZeroPageCount={null}
        containerClassName={cls('ifu-pagination')}
        activeClassName="ifu-pagination__page--active"
        pageClassName="ifu-pagination__page"
        previousClassName="ifu-pagination__button--prev"
        breakClassName="ifu-pagination__button--break"
        nextClassName="ifu-pagination__button--next"
        disabledClassName="ifu-pagination__button--disabled"
        disabledLinkClassName="ifu-pagination__page--disabled"
      />
    </div>
  )
}
export default Pagination
