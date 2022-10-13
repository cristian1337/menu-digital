import { BASE_API } from '../utils/constants'

export async function getProductsApi() {
    try {
        const url = `${BASE_API}/api/products/`;
        
        const response = await fetch(url);
        const result = await response.json();

        return result;
    } catch (error) {
        throw error
    }
}

export async function addProductApi(data, token) {
    try {
        const formData = new FormData();
        formData.append('image', data.image);
        formData.append('title', data.title);
        formData.append('price', data.price);
        formData.append('active', data.active);
        formData.append('categorie', data.categorie);

        const url = `${BASE_API}/api/products/`;
        
        const params = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData,
        }
        const response = await fetch(url, params);
        const result = await response.json();

        return result;
    } catch (error) {
        throw error
    }
}

export async function updateProductApi(id, data, token) {
    try {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('price', data.price);
        formData.append('active', data.active);
        formData.append('categorie', data.categorie);
        if (data.image) formData.append('image', data.image);

        const url = `${BASE_API}/api/products/${id}/`;

        const params = {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData,
        }

        const response = await fetch(url, params);
        const result = response.json();
        return result;
    } catch (error) {
        throw error
    }
}

export async function deleteProductApi(id, token) {
    try {
        const url = `${BASE_API}/api/products/${id}/`;
        const params = {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = await fetch(url, params);
        const result = response.json();
        return result;
    } catch (error) {
        throw error
    }
}

export async function getProductByIdApi(idProduct) {
    try {
        const url = `${BASE_API}/api/products/${idProduct}/`
        const response = await fetch(url)
        const result = await response.json()

        return result
    } catch (error) {
        throw error
    }
}

export async function getProductByCategoryApi(idCategory) {
    try {
        const categoryFilter = `categorie=${idCategory}`

        const url = `${BASE_API}/api/products/?${categoryFilter}`
        const response = await fetch(url)
        const result = response.json()
        return result
    } catch (error) {
        throw error
    }
}