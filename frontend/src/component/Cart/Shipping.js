import React, { Fragment, useState } from "react";
import "./Shipping.css";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../../actions/cartAction";
import MetaData from "../layout/MetaData";
import PinDropIcon from "@material-ui/icons/PinDrop";
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PublicIcon from "@material-ui/icons/Public";
import PhoneIcon from "@material-ui/icons/Phone";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import { Country, State } from "country-state-city";
import { useAlert } from "react-alert";
import CheckoutSteps from "../Cart/CheckoutSteps";

const Shipping = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  const shippingSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length < 10 || phoneNo.length > 10) {
      alert.error("Phone Number should be 10 digits Long");
      return;
    }
    dispatch(
      saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
    );
    history.push("/order/confirm");
  };

  return (
    <Fragment>
      <MetaData title="Shipping Details" />

      <CheckoutSteps activeStep={0} />

      <div className="shippingContainer">
        <div className="shippingBox">
          <h2 className="shippingHeading">Shipping Details</h2>

          <form
            className="shippingForm"
            encType="multipart/form-data"
            onSubmit={shippingSubmit}
          >
            <div style ={{'display': 'flex','width': '100%', 'align-items': 'center'}}>
              <HomeIcon style ={{ 'position': 'absolute','transform': 'translateX(1vmax)','font-size': '1.6vmax','color': 'rgba(0, 0, 0, 0.623)'}}/>
              <input
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                style ={{'padding': '1vmax 4vmax','padding-right': '1vmax','width': '100%','box-sizing': 'border-box','border': '1px solid rgba(0, 0, 0, 0.267)','border-radius': '4px','font': '300 0.9vmax cursive','outline':' none'}}
              />
            </div>

            <div style ={{'display': 'flex','width': '100%', 'align-items': 'center'}}>
              <LocationCityIcon style ={{ 'position': 'absolute','transform': 'translateX(1vmax)','font-size': '1.6vmax','color': 'rgba(0, 0, 0, 0.623)'}}/>
              <input
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                style ={{'padding': '1vmax 4vmax','padding-right': '1vmax','width': '100%','box-sizing': 'border-box','border': '1px solid rgba(0, 0, 0, 0.267)','border-radius': '4px','font': '300 0.9vmax cursive','outline':' none'}}
              />
            </div>

            <div style ={{'display': 'flex','width': '100%', 'align-items': 'center'}}>
              <PinDropIcon style ={{ 'position': 'absolute','transform': 'translateX(1vmax)','font-size': '1.6vmax','color': 'rgba(0, 0, 0, 0.623)'}} />
              <input
                type="number"
                placeholder="Pin Code"
                required
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                style ={{'padding': '1vmax 4vmax','padding-right': '1vmax','width': '100%','box-sizing': 'border-box','border': '1px solid rgba(0, 0, 0, 0.267)','border-radius': '4px','font': '300 0.9vmax cursive','outline':' none'}}
              />
            </div>

            <div style ={{'display': 'flex','width': '100%', 'align-items': 'center'}}>
              <PhoneIcon style ={{ 'position': 'absolute','transform': 'translateX(1vmax)','font-size': '1.6vmax','color': 'rgba(0, 0, 0, 0.623)'}}/>
              <input
                type="number"
                placeholder="Phone Number"
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                size="10"
                style={{'padding': '1vmax 4vmax','padding-right': '1vmax','width': '100%','box-sizing': 'border-box','border': '1px solid rgba(0, 0, 0, 0.267)','border-radius': '4px','font': '300 0.9vmax cursive','outline':' none'}}
              />
            </div>

            <div style ={{'display': 'flex','width': '100%', 'align-items': 'center'}}>
              <PublicIcon style ={{ 'position': 'absolute','transform': 'translateX(1vmax)','font-size': '1.6vmax','color': 'rgba(0, 0, 0, 0.623)'}}/>

              <select
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                style={{'padding': '1vmax 4vmax','padding-right': '1vmax','width': '100%','box-sizing': 'border-box','border': '1px solid rgba(0, 0, 0, 0.267)','border-radius': '4px','font': '300 0.9vmax cursive','outline':' none', 'display':'inline-block'}}
              >
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            {country && (
              <div style ={{'display': 'flex','width': '100%', 'align-items': 'center'}}>
                <TransferWithinAStationIcon style ={{ 'position': 'absolute','transform': 'translateX(1vmax)','font-size': '1.6vmax','color': 'rgba(0, 0, 0, 0.623)'}}/>

                <select
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  style = {{'padding': '1vmax 4vmax','padding-right': '1vmax','width': '100%','box-sizing': 'border-box','border': '1px solid rgba(0, 0, 0, 0.267)','border-radius': '4px','font': '300 0.9vmax cursive','outline':' none','display':'inline-block'}}
                >
                  <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}

            <input
              type="submit"
              value="Continue"
              className="shippingBtn"
              disabled={state ? false : true}
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Shipping;
