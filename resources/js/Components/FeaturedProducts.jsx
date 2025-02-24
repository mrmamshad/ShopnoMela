import { motion } from "framer-motion";
import { Link } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/Components/ui/button";

function FeaturedProducts({ randomProducts }) {
  return (
    <div className="container mx-auto py-6">
      <h2 className="text-2xl font-semibold mb-4">🎯 Just For You</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {randomProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="flex flex-col justify-between overflow-hidden">
              <Link href={route("product.show", product.id)}>
                <img
                  src={product.image || "/placeholder.jpg"}
                  alt={product.title}
                  className="w-full h-48 object-cover"
                />
              </Link>
              <CardHeader>
                <CardTitle className="text-lg">{product.title}</CardTitle>
              </CardHeader>
              <CardContent>
                {console.log("product.price",product.price)}
                <p className="text-gray-600">
  ${parseFloat(product.price).toFixed(2)}
</p>

              </CardContent>
              <CardFooter>
                <Link href={route("product.show", product.id)} className="w-full">
                  <Button className="w-full bg-green-500 hover:bg-green-600 transition-colors">
                    View Details
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default FeaturedProducts;
