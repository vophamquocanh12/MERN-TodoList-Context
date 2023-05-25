import {Form, InputGroup} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCircleXmark, faSpinner, faSearch} from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'

import styles from '../../styles/components/Todo/SearchForm.module.scss'

const cx = classNames.bind(styles)

const SearchForm = ({searchTerm, setSearchTerm, searchValue, setSearchValue, isLoading}) => {
	const handleSearchChange = (e) => {
		setSearchValue(e.target.value)
		setSearchTerm(e.target.value)
	}

	const handleClearSearch = () => {
		setSearchValue('')
		setSearchTerm('')
	}

	return (
		<Form style={{backgroundColor: '#f7f7f7'}}>
			<div
				className="row"
				style={{alignItems: 'center', paddingLeft: '10px', paddingRight: '10px'}}>
				<div className="col">
					<Form.Group
						className="my-3"
						style={{borderColor: 'none'}}>
						<InputGroup>
							<Form.Control
								type="text"
								placeholder="Search for todo"
								value={searchValue}
								onChange={handleSearchChange}
								style={{
									borderRight: 'none',
									boxShadow: 'none',
									outline: 'none',
									borderColor: 'none',
								}}
								className={cx('search-input')}
							/>
							<InputGroup.Append>
								{/* <InputGroup.Text
									style={{
										backgroundColor: '#ffff',
										borderLeft: 'none',
										cursor: 'pointer',
									}}
									onClick={handleClearSearch}>
									<FontAwesomeIcon icon={faSpinner} spin/>
								</InputGroup.Text> */}
								{!searchTerm && (
									<InputGroup.Text
										style={{
											backgroundColor: '#ffff',
											borderLeft: 'none',
											cursor: 'pointer',
										}}>
										<FontAwesomeIcon
											icon={faSearch}
										/>
									</InputGroup.Text>
								)}
								{searchTerm &&
									(isLoading ? (
										<InputGroup.Text
											style={{
												backgroundColor: '#ffff',
												borderLeft: 'none',
												cursor: 'pointer',
											}}>
											<FontAwesomeIcon
												icon={faSpinner}
												spin
											/>
										</InputGroup.Text>
									) : (
										<InputGroup.Text
											style={{
												backgroundColor: '#ffff',
												borderLeft: 'none',
												cursor: 'pointer',
											}}
											onClick={handleClearSearch}>
											<FontAwesomeIcon
												icon={faCircleXmark}
											/>
										</InputGroup.Text>
									))}
							</InputGroup.Append>
						</InputGroup>
					</Form.Group>
				</div>
			</div>
		</Form>
	)
}

export default SearchForm
