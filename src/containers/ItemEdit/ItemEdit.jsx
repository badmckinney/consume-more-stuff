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
    const item = this.props.item;

    if (prevProps === this.props) {
      return;
    }

    if (item.createdBy !== this.props.currentUser) {
      return this.setState({ isOwner: true });
    }

    return this.setState({
      isOwner: false,
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

  error() {
    if (this.state.editError) {
      return <div className="error">error editing post</div>;
    }

    return <></>;
  }

  handleInputOnChange(e) {
    const value = e.target.value;
    const name = e.target.name;
    switch (name) {
      case 'category_id':
        return this.setState({ category_id: value });
      case 'name':
        return this.setState({ name: value });
      case 'price':
        return this.setState({ price: value });
      case 'image':
        return this.setState({ image: value });
      case 'description':
        return this.setState({ description: value });
      case 'manufacturer':
        return this.setState({ manufacturer: value });
      case 'model':
        return this.setState({ model: value });
      case 'condition_id':
        return this.setState({ condition_id: value });
      case 'length':
        return this.setState({ length: value });
      case 'width':
        return this.setState({ width: value });
      case 'height':
        return this.setState({ height: value });
      case 'notes':
        return this.setState({ notes: value });
      case 'status_id':
        return this.setState({ status_id: value });
      default:
        return;
    }
  }

  handleSubmit(e) {
    const editedItem = this.state;

    e.preventDefault();
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

    if (this.state.isOwner) {
      return <div className="error">Denied: user does not own this post</div>;
    }
    return (
      <div className="edit-container">
        {this.error()}
        <form>
          <div>
            <div className="category">Category</div>
          </div>
          <select
            name="category_id"
            value={this.state.category_id}
            onChange={this.handleInputOnChange}
          >
            <option value="1">Automotive</option>
            <option value="2">Furniture</option>
            <option value="3">Appliances</option>
            <option value="4">Electronics</option>
            <option value="5">Sporting Goods</option>
            <option value="6">Jewelry</option>
            <option value="7">Apparel</option>
            <option value="8">Musical Instruments</option>
            <option value="9">Wanted</option>
          </select>

          <div className="title-price">
            <div>
              <label htmlFor="title">Posting Title:</label>
            </div>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleInputOnChange}
            />

            <div>
              <label htmlFor="price">Price</label>
            </div>
            <input
              type="text"
              name="price"
              value={this.state.price}
              onChange={this.handleInputOnChange}
            />
          </div>

          <div>
            <label htmlFor="image">Image:</label>
          </div>
          <input
            type="text"
            name="image"
            value={this.state.image}
            onChange={this.handleInputOnChange}
          />

          <div>
            <label htmlFor="description">Posting Body</label>
          </div>
          <textarea
            name="description"
            value={this.state.description}
            onChange={this.handleInputOnChange}
          />

          <div className="posting-details">
            <div>
              <label htmlFor="manufacturer">Make / Manufacturer</label>
            </div>
            <input
              type="text"
              name="manufacturer"
              value={this.state.manufacturer}
              onChange={this.handleInputOnChange}
            />

            <div>
              <label htmlFor="model">Model Name / Number</label>
            </div>
            <input
              type="text"
              name="model"
              value={this.state.model}
              onChange={this.handleInputOnChange}
            />

            <div>
              <label htmlFor="dimensions">Size / Dimensions</label>
            </div>
            <div className="dimensions">
              <input
                type="text"
                name="length"
                placeholder="length"
                value={this.state.length}
                onChange={this.handleInputOnChange}
              />
              x
              <input
                type="text"
                name="width"
                placeholder="width"
                value={this.state.width}
                onChange={this.handleInputOnChange}
              />
              x
              <input
                type="text-area"
                name="height"
                placeholder="height"
                value={this.state.height}
                onChange={this.handleInputOnChange}
              />
            </div>

            <div>
              <label htmlFor="status_id">Status</label>
            </div>
            <select
              name="status_id"
              value={this.status}
              onChange={this.handleInputOnChange}
            >
              <option value="1">For Sale</option>
              <option value="2">Pending</option>
              <option value="3">Sold</option>
            </select>

            <div>
              <label htmlFor="condition_id">Condition</label>
            </div>
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

            <div>
              <label htmlFor="notes">Notes:</label>
            </div>
            <textarea
              name="notes"
              value={this.state.notes}
              onChange={this.handleInputOnChange}
            />
          </div>

          <Link to={`/items/${this.state.id}`}>
            <button>Cancel Edit</button>
          </Link>
          <button onClick={this.handleSubmit}>Edit Post</button>
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
