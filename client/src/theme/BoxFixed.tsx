import { Link } from "react-router-dom"

const BoxFixed = ({style,img}) => {
  return (
    <Link to={`/login`} className={`${style} xs:hidden md:block fixed z-[200] bottom-16 right-4 bg-cover bg-center`} style={{backgroundImage: `${img}` }} />
  )
}

export default BoxFixed