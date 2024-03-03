import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createProduct } from "../../actions/productAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";

const NewProduct = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, success } = useSelector((state) => state.newProduct);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
    "Electronics",
    "automobile",
    "bagpack"
  ];

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Product Created Successfully");
      history.push("/admin/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, history, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(createProduct(myForm));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <MetaData title="Create Product" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <h1>Create Product</h1>

            <div style={{'display': 'flex','width': '100%','align-items':' center'}}>
              <SpellcheckIcon  style={{'position': 'absolute',
              'transform': 'translateX(1vmax)',
              'font-size': '1.6vmax',
              'color': 'rgba(0, 0, 0, 0.623)'}}/>
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                style ={{ 'padding': '1vmax 4vmax',
                  'padding-right': '1vmax',
                  'width': '100%',
                  'box-sizing': 'border-box',
                 ' border': '1px solid rgba(0, 0, 0, 0.267)',
                  'border-radius':' 4px',
                  'font': '300 0.9vmax cursive',
                 ' outline' : 'none'}}
              />
            </div>
            <div style={{'display': 'flex','width': '100%','align-items':' center'}}>
              <AttachMoneyIcon style={{'position': 'absolute',
              'transform': 'translateX(1vmax)',
              'font-size': '1.6vmax',
              'color': 'rgba(0, 0, 0, 0.623)'}}/>
              <input
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
                style ={{ 'padding': '1vmax 4vmax',
                  'padding-right': '1vmax',
                  'width': '100%',
                  'box-sizing': 'border-box',
                 ' border': '1px solid rgba(0, 0, 0, 0.267)',
                  'border-radius':' 4px',
                  'font': '300 0.9vmax cursive',
                 ' outline' : 'none'}}
              />
            </div>

            <div style={{'display': 'flex','width': '100%','align-items':' center'}}>
              <DescriptionIcon style={{'position': 'absolute',
              'transform': 'translateX(1vmax)',
              'font-size': '1.6vmax',
              'color': 'rgba(0, 0, 0, 0.623)'}}/>

              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
                style = {{ 'padding': '1vmax 4vmax',
                'padding-right': '1vmax',
                'width': '100%',
                'box-sizing': 'border-box',
               ' border': '1px solid rgba(0, 0, 0, 0.267)',
                'border-radius':' 4px',
                'font': '300 0.9vmax cursive',
               ' outline' : 'none'}}
              ></textarea>
            </div>

            <div style={{'display': 'flex','width': '100%','align-items':' center'}}>
              <AccountTreeIcon style={{'position': 'absolute',
              'transform': 'translateX(1vmax)',
              'font-size': '1.6vmax',
              'color': 'rgba(0, 0, 0, 0.623)'}}/>
              <select onChange={(e) => setCategory(e.target.value)} style = {{ 'padding': '1vmax 4vmax',
                'padding-right': '1vmax',
                'width': '100%',
                'box-sizing': 'border-box',
               ' border': '1px solid rgba(0, 0, 0, 0.267)',
                'border-radius':' 4px',
                'font': '300 0.9vmax cursive',
               ' outline' : 'none',
                'display':'block'}}>
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            <div style={{'display': 'flex','width': '100%','align-items':' center'}}>
              <StorageIcon style={{'position': 'absolute',
              'transform': 'translateX(1vmax)',
              'font-size': '1.6vmax',
              'color': 'rgba(0, 0, 0, 0.623)'}}/>
              <input
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
                style = {{ 'padding': '1vmax 4vmax',
                'padding-right': '1vmax',
                'width': '100%',
                'box-sizing': 'border-box',
               ' border': '1px solid rgba(0, 0, 0, 0.267)',
                'border-radius':' 4px',
                'font': '300 0.9vmax cursive',
               ' outline' : 'none'}}
              />
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createProductImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage" style={{'width': '100%',
              'overflow': 'auto'}}>
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" style={{'width': '3vmax',
                  'margin': '0 0.5vmax'}} />
              ))}
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewProduct;
