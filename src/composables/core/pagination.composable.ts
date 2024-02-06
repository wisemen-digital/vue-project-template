interface UsePaginationReturnType {
	handlePageChange: () => void
	handleSortChange: () => void
	handleFilterChange: () => void
	resetPagination: () => void
	setPagination: () => void
}

export function usePagination(): UsePaginationReturnType {
	function handlePageChange(): void {
		//
	}

	function handleSortChange(): void {
		//
	}

	function handleFilterChange(): void {
		//
	}

	function resetPagination(): void {
		//
	}

	function setPagination(): void {
		//
	}

	return {
		handlePageChange,
		handleSortChange,
		handleFilterChange,
		resetPagination,
		setPagination,
	}
}
