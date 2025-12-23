import {Link} from "react-router-dom";
export default function ProductCard(props) {

   const product=props.product;

    return(
      <div className="w-[300px] h-[400px] shadow-2xl m-4 cursor-pointer relative hover:[&_.buttons]:opacity-100 hover:[&_.primary-image]:opacity-0">
        
        <div className ="w-full h-[250px] bg-red-900 relative">
        <img src={product.images[1]} className="w-full h-full absolute  object-cover bg-white" />
        <img src={product.images[0]} className="w-full h-full absolute object-cover bg-white primary-image transition-opacity duration-500" />
        </div>
        <div className="w-full h-[150px] p-2 flex flex-col justify-between">
          <h1 className="text-center  text-lg">{product.name}</h1>
          <div className="w-full flex flex-col items-center">
            {
              product.labelPrice > product.price &&
              <h2 className="text-secondary/80 line-through decoration-gold/70 decoration-2 mr-2">
                LKR.{product.labelPrice.toFixed(2)}
              </h2>

            }
            <h2 className="text-accent font-semibold text-2xl">
              LKR. {product.price.toFixed(2)}
            </h2>
          </div>
        </div>

        <div className="w-full h-[150px] bottom-0 opacity-0 flex flex-row gap-4 transition-opacity justify-center items-center duration-300 absolute buttons bg-white">
          <Link to={"/overview/" + product.productID } className="border-2 border-accent text-accent  hover:bg-accent hover:text-white transition-colors duration-150 h-[50px] w-[150px] flex justify-center items-center">View Details</Link>
        </div>
        </div>
        
      
    );
}