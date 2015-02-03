function CustomSelect(options) {
  var self = this;
  var $selectElem = $(options.elem);
  var $titleElem = $selectElem.find(".customselect-title");
  var $optionsElem = $selectElem.find(".customselect-options");
  var value;
  var clicked = false;

  if (options.value) setValue(options.value);

  $(document).on("click", onDocumentClick);

  $selectElem.on("click", onSelectClick)
    .on("click", "li", onOptionClick)
    .on("selectstart mousedown", false);

  function onOptionClick() {
    setValue($(this).attr("data-value"));
  }

  function onDocumentClick() {
    if (clicked) {
      clicked = false;
      return;
    };

    close();
  }

  function onSelectClick() {
    clicked = true;
    toggle();
  }

  function toggle() {
    $selectElem.toggleClass("opened");
  }

  function close() {
    $selectElem.removeClass("opened");
  }

  function setValue(newValue) {
    var valueTitle;

    $optionsElem.find("li").each(function() {
      if ($(this).attr("data-value") == newValue) valueTitle = $(this).html();
    });
    if (!valueTitle) return false;

    value = newValue;
    $titleElem.html(valueTitle);

    $(self).triggerHandler({
      type: "select",
      value: value,
    });
  }
}