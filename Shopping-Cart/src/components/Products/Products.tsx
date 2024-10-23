import { FunctionComponent, useEffect, useState } from 'react'
import useLocalStorageState from 'use-local-storage-state'

import { CurrencyFormatter } from '../CurrencyFormatter'
import classes from './products.module.scss'
import { Loader } from '../Loader'

const API_URL = 'https://dummyjson.com/products'

export type Product = {
  id: number
  title: string
  price: number
  thumbnail: string
  image: string
  quantity: number
}

export interface CartProps {
  [productId: string]: Product
}

export const Products: FunctionComponent = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [products, setProducts] = useState<Product[]>([])
  const [error, setError] = useState(false)
  const [cart, setCart] = useLocalStorageState<CartProps>('cart', {})


  useEffect(() => {
    fetchData(API_URL)
  }, [])


  async function fetchData(url: string) {
    try {
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        setProducts(data.products)
        setIsLoading(false)
      } else {
        setError(true)
        setIsLoading(false)
      }
    } catch (error) {
      setError(true)
      setIsLoading(false)
    }
  }

  return (
    <section className={classes.productPage}>
      <h1>Products</h1>

      <div className={classes.container}>
        {products.map(product => (
          <div className={classes.product} key={product.id}>
            <img src={product.thumbnail} alt={product.title} />
            <h3>{product.title}</h3>
            <p>Price: <CurrencyFormatter amount={product.price} /></p>
            <button disabled={isInCart(product.id)} onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </section>
  )