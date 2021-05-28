import React, { useEffect, useState, useCallback, useMemo } from 'react'
import Form from 'react-bootstrap/Form'
import Pagination from 'react-bootstrap/Pagination'

import range from 'lodash/range'

const PAGE_SIZES = [10, 20, 30, 50, 100]
const PAGE_RANGE_SIZE = 10

const PokemonPagination = ({
  total,
  initialPageSize,
  initialPage,
  onChange,
}) => {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0])
  const [totalPage, setTotalPage] = useState(0)

  const visibleRange = useMemo(() => {
    const start = Math.max(1, page - Math.floor(PAGE_RANGE_SIZE / 2))
    const end = Math.min(totalPage, start + PAGE_RANGE_SIZE - 1)

    return [start, end]
  }, [totalPage, page])

  const handlePageSizeChange = useCallback(
    e => {
      setPageSize(parseInt(e.target.value))
    },
    [setPageSize]
  )

  useEffect(() => {
    setPage(initialPage)
  }, [initialPage])

  useEffect(() => {
    setPageSize(initialPageSize)
  }, [initialPageSize])

  useEffect(() => {
    const newTotalPage = Math.max(1, Math.ceil(total / pageSize))

    setPage(Math.min(page, newTotalPage))
    setTotalPage(newTotalPage)
  }, [total, page, pageSize, setPage, setTotalPage])

  useEffect(() => {
    onChange({
      page,
      pageSize,
    })
  }, [page, pageSize, onChange])

  return (
    <div className="d-flex align-items-center mb-4">
      <Form.Control
        value={pageSize}
        as="select"
        custom
        style={{ width: '10rem' }}
        onChange={handlePageSizeChange}
      >
        {PAGE_SIZES.map(pageSize => (
          <option key={pageSize} value={pageSize}>
            {pageSize}
          </option>
        ))}
      </Form.Control>

      <div className="mx-4">
        Showing {page} of {totalPage} pages
      </div>

      <Pagination className="m-0">
        <Pagination.First disabled={page === 1} onClick={() => setPage(1)} />
        <Pagination.Prev
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        />

        {range(visibleRange[0], visibleRange[1] + 1).map(p => (
          <Pagination.Item
            key={p}
            active={p === page}
            onClick={() => setPage(p)}
          >
            {p}
          </Pagination.Item>
        ))}

        <Pagination.Next
          disabled={page === totalPage}
          onClick={() => setPage(page + 1)}
        />
        <Pagination.Last
          disabled={page === totalPage}
          onClick={() => setPage(totalPage)}
        />
      </Pagination>
    </div>
  )
}

export default PokemonPagination
