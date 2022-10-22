var Table = React.createClass({
  displayName: "Table",

  render() {
    return React.DOM.table(
      {className: "Table"},
      React.DOM.caption(null, this.props.name),
      React.DOM.thead(
        null,
        React.DOM.tr(
          null,
          ...[...Object.keys(this.props.products[0])].map((key) =>
            React.DOM.th(null, key)
          )
        )
      ),
      React.DOM.tbody(
        null,
        ...this.props.products.map((product) =>
          React.DOM.tr(
            null,
            ...[...Object.entries(product)].map(([name, text]) =>
              React.DOM.td(
                null,
                name === "image"
                  ? React.DOM.img({ src: text, width: 100 })
                  : text
              )
            )
          )
        )
      )
    );
  },
});
