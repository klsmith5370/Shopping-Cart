import { FunctionComponent } from 'react'
import classes from './header.module.scss'

export const Header: FunctionComponent = () => {

  return (
    <header>
      <div className={classes.header}>
        <Link to="/">
          <img src={logo} className={classes.logo} alt="Shopping Cart Application" />
        </Link>
      </div>
      <div>
        <CartWidget productsCount={productsCount} />
      </div>
    </header>
  )
}