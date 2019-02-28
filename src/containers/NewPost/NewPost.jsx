import React, { Component } from 'react';
import { connect } from 'react-redux';

class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      created_by: null,
      status_id: null,
      category_id: null,
      condition_id: null,
      name: '',
      image: '',
      description: '',
      price: null,
      manufacturer: '',
      model: '',
      length: null,
      width: null,
      height: null,
      notes: '',
      views: null
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    const value = e.target.value;
    const name = e.target.name;
    switch (name) {
      case 'created_by':
        this.setState({ created_by: value });
        break;
      case 'status_id':
        this.setState({ status_id: value });
        break;
      case 'category_id':
        this.setState({ category_id: value });
        break;
      case 'condition_id':
        this.setState({ condition_id: value });
      case 'name':
        this.setState({ name: value });
        break;
      case 'image':
        this.setState({ image: value });
        break;
      case 'description':
        this.setState({ description: value });
        break;
      case 'price':
        this.setState({ price: value });
        break;
      case 'manufacturer':
        this.setState({ manufacturer: value });
        break;
      case 'model':
        this.setState({ model: value });
        break;
      case 'length':
        this.setState({ length: value });
        break;
      case 'width':
        this.setState({ width: value });
        break;
      case 'height':
        this.setState({ height: value });
        break;
      case 'notes':
        this.setState({ notes: value });
        break;
      case 'views':
        this.setState({ views: value });
        break;
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    const {
      created_by,
      status_id,
      category_id,
      condition_id,
      name,
      image,
      description,
      price,
      manufacturer,
      model,
      length,
      width,
      height,
      notes,
      views
    } = this.state;

    this.props.newPost({
      created_by,
      status_id,
      category_id,
      condition_id,
      name,
      image,
      description,
      price,
      manufacturer,
      model,
      length,
      width,
      height,
      notes,
      views
    });
  }
  render() {
    return (
      <form className="form-container">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={this.state.body}
          onChange={this.handleInputChange}
        />

        <label>Image:</label>
        <input
          type="text"
          name="image"
          value={this.state.body}
          onChange={this.handleInputChange}
        />

        <label>Description:</label>
        <input
          type="text"
          name="description"
          value={this.state.body}
          onChange={this.handleInputChange}
        />

        <label>Pice:</label>
        <input
          type="text"
          name="price"
          value={this.state.body}
          onChange={this.handleInputChange}
        />

        <label>Manufacturer:</label>
        <input
          type="text"
          name="manufacturer"
          value={this.state.body}
          onChange={this.handleInputChange}
        />

        <label>Model:</label>
        <input
          type="text"
          name="model"
          value={this.state.body}
          onChange={this.handleInputChange}
        />

        <label>Length:</label>
        <input
          type="text"
          name="length"
          value={this.state.body}
          onChange={this.handleInputChange}
        />

        <label>Width:</label>
        <input
          type="text"
          name="width"
          value={this.state.body}
          onChange={this.handleInputChange}
        />

        <label>Height:</label>
        <input
          type="text"
          name="height"
          value={this.state.body}
          onChange={this.handleInputChange}
        />

        <label>Notes:</label>
        <input
          type="text"
          name="notes"
          value={this.state.body}
          onChange={this.handleInputChange}
        />

        <label>Views:</label>
        <input
          type="text"
          name="views"
          value={this.state.body}
          onChange={this.handleInputChange}
        />

        <button onCLick={this.handleSubmit}>Create New Post</button>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    items: state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    NewPost: task => {
      dispatch(NewPost(task));
    }
  };
};

NewPost = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewPost);

export default NewPost;
