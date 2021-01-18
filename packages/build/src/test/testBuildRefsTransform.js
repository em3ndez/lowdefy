function add(a, b) {
  return a + b;
}

function transformer(obj, vars) {
  return {
    json: JSON.stringify(obj),
    add: add(obj.a, 42),
    var: vars.var1,
  };
}

module.exports = transformer;
