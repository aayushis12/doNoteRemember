'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Todo = function (_React$Component) {
  _inherits(Todo, _React$Component);

  function Todo(props) {
    _classCallCheck(this, Todo);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {
      input: '',
      list: []
    };
    _this.addTodo = _this.addTodo.bind(_this);
    _this.deleteTodo = _this.deleteTodo.bind(_this);
    _this.updateTodo = _this.updateTodo.bind(_this);
    return _this;
  }

  Todo.prototype.deleteTodo = function deleteTodo(i) {
    var list = this.state.list;
    list.splice(i, 1);
    this.setState({
      list: list
    });
  };

  Todo.prototype.addTodo = function addTodo(saveText) {
    var list = this.state.list;
    list.push({
      text: saveText,
      date: "" + new Date()
    });
    this.setState({
      list: list
    });
  };

  Todo.prototype.updateTodo = function updateTodo(i, newText) {
    console.log(i);
    console.log(newText);
    var list = this.state.list;
    list[i].text = newText;

    this.setState({
      list: list
    });
  };

  Todo.prototype.render = function render() {
    //console.log(this.props.message);
    return React.createElement(
      'div',
      null,
      React.createElement(Save, { text: this.state.input, saveText: this.addTodo }),
      React.createElement(Display, { display: this.state.list, deleteTodo: this.deleteTodo, updateTodo: this.updateTodo })
    );
  };

  return Todo;
}(React.Component);

var Save = function (_React$Component2) {
  _inherits(Save, _React$Component2);

  function Save(props) {
    _classCallCheck(this, Save);

    var _this2 = _possibleConstructorReturn(this, _React$Component2.call(this, props));

    _this2.state = {
      input: _this2.props.text
    };
    _this2.changeText = _this2.changeText.bind(_this2);
    _this2.addtoTodo = _this2.addtoTodo.bind(_this2);
    return _this2;
  }

  Save.prototype.changeText = function changeText(e) {
    this.setState({
      input: e.target.value
    });
  };

  Save.prototype.addtoTodo = function addtoTodo() {
    this.props.saveText(this.state.input);
    this.setState({
      input: ''
    });
  };

  Save.prototype.render = function render() {
    return React.createElement(
      'div',
      { className: 'input' },
      React.createElement('input', { type: 'text', value: this.state.input, onChange: this.changeText }),
      React.createElement('input', { type: 'button', value: 'save', onClick: this.addtoTodo })
    );
  };

  return Save;
}(React.Component);

var Display = function (_React$Component3) {
  _inherits(Display, _React$Component3);

  function Display(props) {
    _classCallCheck(this, Display);

    var _this3 = _possibleConstructorReturn(this, _React$Component3.call(this, props));

    _this3.state = {
      todos: []
    };
    return _this3;
  }

  Display.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    this.setState({
      todos: nextProps.display
    });
  };

  Display.prototype.render = function render() {
    var renderList = this.state.todos;
    //console.log(renderList)
    var listElements = [];
    for (var i = 0; i < renderList.length; i++) {
      listElements.push(React.createElement(Post, { i: i, text: renderList[i].text, date: renderList[i].date, deleteTodo: this.props.deleteTodo, updateTodo: this.props.updateTodo }));
    }
    return React.createElement(
      'div',
      { className: 'text-primary input' },
      listElements
    );
  };

  return Display;
}(React.Component);

var Post = function (_React$Component4) {
  _inherits(Post, _React$Component4);

  function Post(props) {
    _classCallCheck(this, Post);

    var _this4 = _possibleConstructorReturn(this, _React$Component4.call(this, props));

    _this4.state = {
      isEdit: false,
      text: _this4.props.text
    };
    _this4.deleteTodo = _this4.deleteTodo.bind(_this4);
    _this4.editTodo = _this4.editTodo.bind(_this4);
    _this4.onchange = _this4.onchange.bind(_this4);
    _this4.updateTodo = _this4.updateTodo.bind(_this4);
    return _this4;
  }

  Post.prototype.deleteTodo = function deleteTodo(i) {
    this.props.deleteTodo(i);
  };

  Post.prototype.editTodo = function editTodo() {
    this.setState({
      isEdit: true
    });
  };

  Post.prototype.updateTodo = function updateTodo(i) {
    console.log("textis: " + this.state.text);
    this.props.updateTodo(i, this.state.text);
    this.setState({
      isEdit: false
    });
  };

  Post.prototype.onchange = function onchange(e) {
    console.log("heyy");
    this.setState({
      text: e.target.value
    });
  };

  Post.prototype.render = function render() {
    if (this.state.isEdit === false) {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'span',
          { className: 'text_date' },
          'Text: ',
          this.props.text,
          ' | '
        ),
        React.createElement(
          'span',
          { className: 'text_date' },
          'Date: ',
          this.props.date,
          ' '
        ),
        React.createElement(
          'a',
          { className: 'delete', onClick: this.deleteTodo.bind(this, this.props.i) },
          'Delete'
        ),
        React.createElement(
          'a',
          { className: 'edit', onClick: this.editTodo },
          'Edit'
        ),
        React.createElement('hr', null)
      );
    } else {
      return React.createElement(
        'div',
        null,
        React.createElement('input', { type: 'text', value: this.state.text, onChange: this.onchange }),
        React.createElement(
          'button',
          { onClick: this.updateTodo.bind(this, this.props.i) },
          ' Update '
        )
      );
    }
  };

  return Post;
}(React.Component);

ReactDOM.render(React.createElement(Todo, { message: 'hello' }), document.getElementById('root'));