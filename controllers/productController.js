import { v2 as cloudinary } from "cloudinary";



//function for add product

const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subcategory,
      sizes,
      bestseller,
    } = req.body;

    const image1 = req.files.images1 && req.files.image1[0];
    const image2 = req.files.images2 && req.files.image2[0];
    const image3 = req.files.images3 && req.files.image3[0];
    const image4 = req.files.images4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image"
        });
        return result.secure_url;
      })
    )



    console.log(
      name,
      description,
      price,
      category,
      subcategory,
      sizes,
      bestseller
    );
    console.log(imagesUrl);

    res.json({});
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// function for list Products

const listProducts = async (req, res) => {};

//function for removing product

const removeProduct = async (req, res) => {};

//function forsingle product info

const singleProduct = async (req, res) => {};

export { addProduct, listProducts, removeProduct, singleProduct };
