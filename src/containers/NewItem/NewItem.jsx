import React, { Component } from 'react';
import { addItem } from '../../actions';
import { connect } from 'react-redux';
import './NewItem.scss';

class NewItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isError: false,
      category_id: 1,
      name: '',
      price: '',
      image: '',
      description: '',
      manufacturer: '',
      model: '',
      condition_id: 1,
      length: '',
      width: '',
      height: '',
      notes: ''
    };

    this.error = this.error.bind(this);
    this.handleInputOnChange = this.handleInputOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  error() {
    if (this.state.isError) {
      return <div className="error">error creating post</div>;
    }

    return <></>;
  }

  handleInputOnChange(e) {
    const value = e.target.value;
    const name = e.target.name;
    let file;

    if (e.target.files) {
      file = e.target.files[0];
    }

    if (value === 'image') {
      return this.setState({ image: file });
    }

    return this.setState({ [name]: value });
  }

  handleSubmit(e) {
    const newItem = this.state;

    e.preventDefault();
    this.props.addItem(newItem).then(data => {
      if (!data) {
        return this.setState({ isError: true });
      }

      this.setState({ isError: false });
      return this.props.history.push(`/items/${data}`);
    });
  }

  render() {
    if (!this.props.currentUser) {
      return <div className="error">Must be logged in to create post</div>;
    }

    return (
      <div className="add-item-page">
        {this.error()}
        <h2>Create Post:</h2>
        <form>
          <div>
            <label htmlFor="category_id">Category:</label>
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
              L:
              <input
                type="text"
                name="length"
                placeholder="length"
                value={this.state.length}
                onChange={this.handleInputOnChange}
              />
              W:
              <input
                type="text"
                name="width"
                placeholder="width"
                value={this.state.width}
                onChange={this.handleInputOnChange}
              />
              H:
              <input
                type="text-area"
                name="height"
                placeholder="height"
                value={this.state.height}
                onChange={this.handleInputOnChange}
              />
            </div>

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

          <button onClick={this.handleSubmit}>Create Post</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addItem: item => dispatch(addItem(item))
  };
};

NewItem = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewItem);

export default NewItem;
