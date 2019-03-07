import React, { Component } from 'react';
import { loadSingleItem, editItem } from '../../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './ItemEdit.scss';

class ItemEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notFound: false,
      isOwner: false,
      editError: false,
      id: '',
      category_id: '',
      name: '',
      price: '',
      image: '',
      description: '',
      manufacturer: '',
      model: '',
      condition_id: '',
      length: '',
      width: '',
      height: '',
      notes: '',
      status_id: ''
    };

    this.form = React.createRef();
    this.validate = this.validate.bind(this);
    this.error = this.error.bind(this);
    this.handleInputOnChange = this.handleInputOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const id = this.props.match.params.id;

    this.props.loadItem(id).then(data => {
      if (!data) {
        return this.setState({ notFound: true });
      }

      return this.setState({ notFound: false });
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps === this.props) {
      return;
    }

    const item = this.props.item;

    if (item.createdBy !== this.props.currentUser) {
      return;
    }

    return this.setState({
      isOwner: true,
      id: item.id,
      category_id: item.category_id,
      name: item.name,
      price: item.price ? item.price : '',
      image: item.image ? item.image : '',
      description: item.description,
      manufacturer: item.manufacturer ? item.description : '',
      model: item.model ? item.model : '',
      condition_id: item.condition_id,
      length: item.length ? item.length : '',
      width: item.width ? item.width : '',
      height: item.height ? item.height : '',
      notes: item.notes ? item.notes : '',
      status_id: item.status_id
    });
  }

  validate() {
    return this.form.current.reportValidity();
  }

  error() {
    if (this.state.editError) {
      return <div className="error">error editing post</div>;
    }

    return <></>;
  }

  handleInputOnChange(e) {
    const value = e.target.value;
    const name = e.target.name;

    return this.setState({ [name]: value });
  }

  handleSubmit(e) {
    const editedItem = this.state;

    e.preventDefault();

    if (!this.validate()) {
      return;
    }

    this.props.editItem(editedItem).then(data => {
      if (!data) {
        return this.setState({ editError: true });
      }

      this.setState({ editError: false });
      return this.props.history.push(`/items/${editedItem.id}`);
    });
  }

  render() {
    if (this.state.notFound) {
      return <div className="error">Item not found</div>;
    }

    if (!this.state.isOwner) {
      return <div className="error">Denied: user does not own this post</div>;
    }

    return (
      <div className="edit-container">
        {this.error()}
        <form ref={this.form}>
          <div className="top-box">
            <div className="title-price-container">
              <div className="title">
                <label htmlFor="title">Posting Title:</label>
                <input
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleInputOnChange}
                  required
                />
              </div>
              <div className="price">
                <label htmlFor="price">Price</label>

                <input
                  type="number"
                  name="price"
                  value={this.state.price}
                  onChange={this.handleInputOnChange}
                />
              </div>
            </div>

            <div className="description-container">
              <div className="description">
                <label>Posting Body</label>
                <textarea
                  name="description"
                  value={this.state.description}
                  onChange={this.handleInputOnChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="posting-details">
            <div className="detail-container1">
              <label className="manufacturer">Make / Manufacturer</label>
              <input
                type="text"
                name="manufacturer"
                value={this.state.manufacturer}
                onChange={this.handleInputOnChange}
              />
              <label className="model-name">Model Name / Number</label>
              <input
                type="text"
                name="model"
                value={this.state.model}
                onChange={this.handleInputOnChange}
              />
              <label className="dimension-name">Size / Dimensions</label>
              <div className="dimensions">
                <input
                  type="text"
                  name="length"
                  placeholder="length"
                  value={this.state.length}
                  onChange={this.handleInputOnChange}
                />

                <input
                  type="text"
                  name="width"
                  placeholder="width"
                  value={this.state.width}
                  onChange={this.handleInputOnChange}
                />
                <input
                  type="text-area"
                  name="height"
                  placeholder="height"
                  value={this.state.height}
                  onChange={this.handleInputOnChange}
                />
              </div>
            </div>

            <div className="select-container">
              <div className="category">
                <label>Category</label>
                <select
                  name="category_id"
                  value={this.state.category_id}
                  onChange={this.handleInputOnChange}
                >
                  <option value="1">Apparel</option>
                  <option value="2">Appliances</option>
                  <option value="3">Automotive</option>
                  <option value="4">Electronics</option>
                  <option value="5">Furniture</option>
                  <option value="6">Jewelry</option>
                  <option value="7">Musical Instruments</option>
                  <option value="8">Sporting Goods</option>
                  <option value="9">Other</option>
                  <option value="10">Wanted</option>
                </select>
              </div>
              <div className="condition">
                <label>Condition</label>
                <select
                  name="condition_id"
                  value={this.state.condition_id}
                  onChange={this.handleInputOnChange}
                >
                  <option value="1">Poor</option>
                  <option value="2">Fair</option>
                  <option value="3">Great</option>
                  <option value="4">Excellent</option>
                  <option value="5">New In Box</option>
                </select>
              </div>
            </div>

            <div className="status">
              <div>
                <label htmlFor="status_id">Status</label>
              </div>
              <select
                name="status_id"
                value={this.state.status_id}
                onChange={this.handleInputOnChange}
              >
                <option value="1">for sale</option>
                <option value="3">sold</option>
              </select>
            </div>

            <div className="notes-container">
              <label className="notes">Notes</label>
              <textarea
                name="notes"
                value={this.state.notes}
                onChange={this.handleInputOnChange}
              />
            </div>
          </div>
          <div className="button-container">
            <div className="submit">
              <button className="btn" onClick={this.handleSubmit}>
                Submit Changes
              </button>
            </div>
            <div className="cancel">
              <Link to={`/items/${this.state.id}`}>
                <button className="btn">Cancel Changes</button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    item: state.item,
    currentUser: state.currentUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadItem: id => dispatch(loadSingleItem(id)),
    editItem: item => dispatch(editItem(item))
  };
};

ItemEdit = connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemEdit);

export default ItemEdit;
