import { useMemo } from "react"

interface PaginationProps {
  totalCount: number
  pageSize: number
  siblingCount: number
  currentPage: number
}

export const DOTS = '&#8230;'

export const usePagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage
}: PaginationProps) => {

  const range = (start: number, end: number) => {
    const length = end - start + 1

    return Array.from({ length }, (_, index) => index + start)
  }

  const paginationRange = useMemo(() => {
    const totalPageNumbers = siblingCount + 5
    const totalPageCount = Math.ceil(totalCount / pageSize)

    //No dots
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount)
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount)

    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2

    const firstPageIndex = 1
    const lastPageIndex = totalPageCount

    //Right dots
    if (!shouldShowLeftDots && !shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount
      let leftRange = range(1, leftItemCount)

      return [...leftRange, DOTS, totalPageCount]
    }

    //Left dots
    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount
      let rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount)

      return [firstPageIndex, DOTS, ...rightRange]
    }

    //Both left and Right dots
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }

  }, [totalCount, pageSize, siblingCount, currentPage])

  return paginationRange
}
