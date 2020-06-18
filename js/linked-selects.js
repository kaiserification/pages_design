 "use strict";

    function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

    function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

    var LinkedSelect = function LinkedSelect($element) {
    var _this = this;

    _classCallCheck(this, LinkedSelect);

    _defineProperty(this, "showLoader", function () {
        _this.$loader = document.createElement('i');

        _this.$loader.classList.add('fa');

        _this.$loader.classList.add('fa-spinner');

        _this.$loader.classList.add('fa-spin');

        _this.$target.parentNode.appendChild(_this.$loader);
    });

    _defineProperty(this, "hideLoader", function () {
        if (_this.$loader != null) {
        _this.$target.parentNode.removeChild(_this.$loader);

        _this.$loader = null;
        }
    });

    _defineProperty(this, "onChange", function (e) {

        if (e.target.value == 0 || e.target.value == '') {
            return;
        }
        _this.showLoader();

        var request = new XMLHttpRequest();

        if (_this.$element) {
            request.open('GET', _this.$element.getAttribute('data-source').replace('$id', e.target.value), true);
        }

        request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            var data = JSON.parse(request.responseText);
            debugger
            var options = data.map(function (datum) {
                return `<option value="${datum.id}">${datum.name} ${datum.weight || ''}</option>`
            }).join('');

            _this.hideLoader();

            _this.$target.innerHTML = options;

            _this.$target.insertBefore(_this.$placeholder, _this.$target.firstChild);

            _this.$target.selectedIndex = 0;
            _this.$target.style.display = null;
        } else {
            alert('Impossible de charger les infos');
        }
        };

        request.onerror = function () {
        alert('Impossible de récupérer les informations.');
        };

        request.send();
    });

    this.$element = $element;
    this.$loader = null;
    this.$target = document.querySelector($element.getAttribute('data-target'));
    this.$placeholder = this.$target.firstElementChild;
    this.$element.addEventListener('change', this.onChange);
    };

    document.querySelectorAll('.linked-select').forEach(function ($select) {
        return new LinkedSelect($select);
    });