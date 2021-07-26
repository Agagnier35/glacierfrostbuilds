package com.idleon.glacierfrostbuilds.utils

import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort

class UnpagedSort(private val sort: Sort = Sort.unsorted()) : Pageable {

    override fun isPaged(): Boolean {
        return false
    }

    override fun previousOrFirst(): Pageable {
        return this
    }

    override fun next(): Pageable {
        return this
    }

    override fun hasPrevious(): Boolean {
        return false
    }

    override fun getSort(): Sort {
        return sort
    }

    override fun getPageSize(): Int {
        throw UnsupportedOperationException()
    }

    override fun getPageNumber(): Int {
        throw UnsupportedOperationException()
    }

    override fun getOffset(): Long {
        throw UnsupportedOperationException()
    }

    override fun first(): Pageable {
        return this
    }

    override fun withPage(pageNumber: Int): Pageable {
        if (pageNumber == 0) {
            return this
        }
        throw UnsupportedOperationException()
    }
}