
import { useParams } from 'react-router-dom'

import { useQuery } from '@tanstack/react-query';
import { getProductById } from '../services/productService';



function ProductPage() {
    const { id } = useParams();
    const { data: product, isLoading, isError } = useQuery({
        queryKey: ["product", id],
        queryFn: ()=>getProductById(id),

    })
    if(isLoading){
        return <p>Loading...</p>
    }
    if(isError){
        return <p>Somwthing Went Wrong</p>
    }

    return (
        <div>
            {
                <div>{product.name}</div>
            }
        </div>
    )
}

export default ProductPage