const formatString = (str) => {
    return (str || "").replace(/(&quot;)/g, '"').replace(/(&#039;)/g, "'").replace(/(&eacute;)/g, "é");
  };
  
  export default formatString;