import React, { useEffect, useRef } from 'react';
import useFetch from '../../hooks/useFetch';

const FilterCategory = ({setProdCategory}) => {

    const [categories, getCategories] = useFetch();

    useEffect(() => {
        const url = 'https://e-commerce-api-v2.academlo.tech/api/v1/categories';
      getCategories(url);
    }, []);

    const selecOption = useRef();

    const handleChange = () => {
        setProdCategory(selecOption.current.value);
    }

  return (
    <select>
        <option value="">All Categories</option>
        {
            categories?.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
            ))
        }
    </select>
  )
}


export default FilterCategory;