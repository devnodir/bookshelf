import { Grid, Container, Typography, Box, Button } from '@mui/material';
import React, { useMemo, useState } from 'react';
import useApi from '@/hooks/useApi';
import { BOOKS } from '@/constans/api.const';
import { parseDataArray } from '@/utils/methods';
import BookItem from './component/BookItem';
import { Add, Search } from '@mui/icons-material';
import AddModal from './component/AddModal';
import { IBook, IBookData } from '@/types/book.type';
import EditModal from './component/EditModal';
import SearchModal from './component/SearchModal';


const Home: React.FC = () => {

	const { data, refetch } = useApi(BOOKS)

	const [addModal, setAddModal] = useState(false)
	const [editModal, setEditModal] = useState(false)
	const [searchModal, setSearchModal] = useState(false)
	const [item, setItem] = useState<IBook | null>(null)

	const books: IBookData[] = useMemo(() => {
		return parseDataArray(data)
	}, [data])

	const openAddModal = () => {
		setAddModal(true)
	}

	const openEditModal = (item: IBook) => {
		setItem(item)
		setEditModal(true)
	}

	const openSearchModal = () => {
		setSearchModal(true)
	}

	return (
		<Container sx={{ py: 4 }} maxWidth="xl">
			<Box display="flex" justifyContent="right" sx={{ mb: 2 }}>
				<Button variant="contained" startIcon={<Search />} sx={{ mr: 2 }} onClick={openSearchModal}>
					Search Book
				</Button>
				<Button variant="contained" color="success" startIcon={<Add />} onClick={openAddModal}>
					Add Book
				</Button>
			</Box>
			{
				books.length ?
					<Grid container spacing={4}>
						{books.map((item) => (
							<Grid item key={item.book.id} xs={8} sm={4} md={3} lg={2}>
								<BookItem item={{ ...item.book, status: item.status }} onEdit={openEditModal} refetch={refetch} />
							</Grid>
						))}
					</Grid> :
					<Container maxWidth="sm">
						<Typography variant="h6" align="center" color="text.secondary" paragraph>
							There is no books yet, add your favorite books
						</Typography>
					</Container>
			}
			{addModal && <AddModal onClose={setAddModal} refetch={refetch} />}
			{(editModal && item) && <EditModal onClose={setEditModal} refetch={refetch} item={item} />}
			{searchModal && <SearchModal onClose={setSearchModal} refetch={refetch} />}
		</Container>
	)
}

export default Home