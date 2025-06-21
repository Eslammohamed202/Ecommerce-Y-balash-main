import { BiSolidCategory } from "react-icons/bi";

const products = [
    { id: 1, name: "Cheese Cake", sku: "Bakery", stock: 2 },
    { id: 2, name: "Cheese Cake", sku: "Bakery", stock: 2 },
    { id: 3, name: "Cheese Cake", sku: "Bakery", stock: 2 },
    { id: 4, name: "Cheese Cake", sku: "Bakery", stock: 2 },
    { id: 5, name: "Cheese Cake", sku: "Bakery", stock: 2 },
    { id: 6, name: "Cheese Cake", sku: "Bakery", stock: 2 },
    { id: 7, name: "Cheese Cake", sku: "Bakery", stock: 2 },
    { id: 8, name: "Cheese Cake", sku: "Bakery", stock: 2 },
    { id: 9, name: "Cheese Cake", sku: "Bakery", stock: 2 },

];

const LowStockCard = () => {
    return (
        <div className="flex justify-between gap-6 items-center flex-wrap container mt-8">
            {products.map((product) => (
                <div
                    key={product.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-white w-[380px] shadow-md"
                >
                    <div className="w-1/4 flex items-center">
                        <img
                            src="/caake.png"
                            alt="Bread Basket"
                            className="w-16 h-16 object-cover"
                        />
                    </div>

                    <div className="w-3/4 flex flex-col justify-center items-start gap-2 relative">
                        <h3 className="font-medium text-gray-900">{product.name}</h3>
                        <h3 className="font-xs text-gray-900">SKU: {product.sku}</h3>
                        <div className="flex items-center gap-1 text-[#EF4444] font-semibold">
                            <BiSolidCategory />
                            <p>Only {product.stock} left</p>
                            <div className="p-2 bg-[#FFEDD5] rounded-full absolute right-0 top-0">
                                <span className="text-[#EA580C]">Low</span>
                            </div>
                        </div>
                        <button className="text-xs font-medium text-white bg-Main px-3 py-3 rounded-xl w-full">
                            Restock Now
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default LowStockCard;