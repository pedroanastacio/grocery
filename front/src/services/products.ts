import { validateNumberQueryParam } from '../commons/utils/validateNumberQueryParam';
import IListResult from '../interfaces/listResult';
import IProduct from '../interfaces/models/product';
import api from './api';

const DEFAULT_PER_PAGE = 12;	
const DEFAULT_PAGE = 1;


class ProductService {

	public getProductsByCategory = async (categorySlug: string, searchParams: URLSearchParams): Promise<IListResult<IProduct>> => {
		const name: string|null = searchParams.get('name');
		const page: number = validateNumberQueryParam(searchParams.get('page'), DEFAULT_PAGE);
		const perPage: number = validateNumberQueryParam(searchParams.get('perPage'), DEFAULT_PER_PAGE);
		const sort: string|null = searchParams.get('sort');

		const { data: products } = await api.get<IListResult<IProduct>>(`/category/${categorySlug}/products?${name !== null ? `name=${name}&` : '' }page=${page}&perPage=${perPage}${sort !== null ? `&sort=${sort}` : ''}`);
		
		return products;
	};
}

const productService = new ProductService();
export default productService;
