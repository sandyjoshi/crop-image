var React = require('react');
var ReactDOM = require('react-dom');

// ToDo : utils
var isTouchDevice =
    !!(typeof window !== 'undefined' &&
       typeof navigator !== 'undefined' &&
       ('ontouchstart' in window || navigator.msMaxTouchPoints > 0)
      );

var userEvents = {
    touch: {
        react: {
            down: 'onTouchStart',
            mouseDown: 'onMouseDown',
        },
        native: {
            move: 'touchmove',
            mouseMove: 'mousemove',
            up: 'touchend',
            mouseUp: 'mouseup'
        }
    },
    desktop: {
        react: {
            down: 'onMouseDown',
        },
        native: {
            move: 'mousemove',
            up: 'mouseup'
        }
    }
};

var deviceEvents = isTouchDevice ? userEvents.touch : userEvents.desktop;

var CropComponent = React.createClass({
    propTypes: {
        scale: React.PropTypes.number,
        image: React.PropTypes.string,
        width: React.PropTypes.number,
        height: React.PropTypes.number,
        style: React.PropTypes.object,

        onLoadFailure: React.PropTypes.func,
        onLoadSuccess: React.PropTypes.func,
        onImageReady: React.PropTypes.func,
        onMouseUp: React.PropTypes.func
    },

    getDefaultProps() {
        return {
            scale: 1,
            onLoadFailure() {},
            onLoadSuccess() {},
            onImageReady() {},
            onMouseUp() {}
        }
    },

    getInitialState() {
        return {
            moved: false,
            my: null,
            mx: null,
            pos:{
                x:1,
                y:1
            }
        };
    },

    getCroppedImage(type, quality) {
        var dom = document.createElement('canvas');
        var context = dom.getContext('2d');

        // clone canvas
        var mainCanvas = document.createElement('canvas');
        mainCanvas.width = this.props.width ;
        mainCanvas.height = this.props.height;
        var contextMain = mainCanvas.getContext('2d');
        contextMain.clearRect(0, 0, this.props.width, this.props.height);
        this.paintImage( contextMain , this.state.image );

        dom.width = this.props.cropWidth * this.props.scale;
        dom.height = this.props.cropHeight * this.props.scale;

        context.save();
        context.drawImage(mainCanvas,
            this.state.pos.x, this.state.pos.y, this.props.cropWidth , this.props.cropHeight ,
            0, 0, this.props.cropWidth * this.props.scale, this.props.scale * this.props.cropHeight
        );
        context.restore();

        return dom.toDataURL(type, quality);
    },

    // ToDo : utils
    isDataURL(str) {
        var regex = /^\s*data:([a-z]+\/[a-z]+(;[a-z\-]+\=[a-z\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/i;
        return !!str.match(regex);
    },

    loadImage(imageURL) {
        var imageObj = new Image();
        imageObj.onload = this.handleImageReady.bind(this, imageObj);
        imageObj.onerror = this.props.onLoadFailure;
        if (!this.isDataURL(imageURL)) imageObj.crossOrigin = 'anonymous';
        imageObj.src = imageURL;
    },

    componentDidMount() {
        var context = ReactDOM.findDOMNode(this.refs.canvas).getContext('2d');
        if (this.props.image) {
            this.loadImage(this.props.image);
        }
        this.paintCropRect(context);
        if (document) {
            var nativeEvents = deviceEvents.native;
            document.addEventListener(nativeEvents.move, this.handleMouseMove, false);
            document.addEventListener(nativeEvents.up, this.handleMouseUp, false);
            if (isTouchDevice) {
                document.addEventListener(nativeEvents.mouseMove, this.handleMouseMove, false);
                document.addEventListener(nativeEvents.mouseUp, this.handleMouseUp, false);
            }
        }

        if (isTouchDevice && React.initializeTouchEvents) React.initializeTouchEvents(true);
    },

    componentWillUnmount() {
        if (document) {
            var nativeEvents = deviceEvents.native;
            document.removeEventListener(nativeEvents.move, this.handleMouseMove, false);
            document.removeEventListener(nativeEvents.up, this.handleMouseUp, false);
            if (isTouchDevice) {
                document.removeEventListener(nativeEvents.mouseMove, this.handleMouseMove, false);
                document.removeEventListener(nativeEvents.mouseUp, this.handleMouseUp, false);
            }
        }
    },

    componentDidUpdate(prevProps, prevState) {
        var context = ReactDOM.findDOMNode(this.refs.canvas).getContext('2d');
        context.clearRect(0, 0, this.props.width, this.props.height);

        this.paintCropRect(context);
        this.paintImage(context, this.state.image);

        if( prevState.image != this.state.image ){
          let croppedImage = this.getCroppedImage();
          this.props.action(croppedImage);
        }

    },

    handleImageReady(image) {
        this.props.onLoadSuccess(image);
        this.setState({moved: false, image: image}, this.props.onImageReady);
    },

    componentWillReceiveProps(newProps) {
        if (this.props.image != newProps.image) {
            this.loadImage(newProps.image);
        }
    },

    paintImage(context, image) {
        if (image) {
            context.save();
            context.globalCompositeOperation = 'destination-over';
            context.drawImage(image, 0, 0, this.props.width, this.props.height);
            context.restore();
        }
    },

    paintCropRect(context) {
        context.save();
        context.beginPath();
        context.strokeStyle = "red";
        context.lineWidth=2;
        context.setLineDash([5, 5]);
        context.rect(this.state.pos.x, this.state.pos.y, this.props.cropWidth, this.props.cropHeight);
        context.stroke();
        context.restore();
    },

    handleMouseDown(e) {
        var e = e || window.event;
        // if e is a touch event, preventDefault keeps
        // corresponding mouse events from also being fired
        // later.
        e.preventDefault();
        this.setState({
            moved: true,
            mx: null,
            my: null
        });
    },
    handleMouseUp() {
        if (this.state.moved) {
            this.setState({moved: false});
        }
        let croppedImage = this.getCroppedImage();
        this.props.action(croppedImage);
    },

    handleMouseMove(e) {
        var e = e || window.event;
        if (false == this.state.moved) {
            return;
        }

        // ToDo : boundry check for rect.

        var pos = this.state.pos;
        var lastPosX = pos.x ;
        var lastPosY = pos.y ;

        var mousePositionX = e.targetTouches ? e.targetTouches[0].pageX : e.clientX;
        var mousePositionY = e.targetTouches ? e.targetTouches[0].pageY : e.clientY;

        var newState = { mx: mousePositionX, my: mousePositionY, pos: pos };

        if (this.state.mx && this.state.my) {
            var xDiff = (this.state.mx - mousePositionX) ;
            var yDiff = (this.state.my - mousePositionY) ;
            // ToDo : boundry condition function
            var newY = lastPosY - yDiff ;
            if( newY < 1 ) {
                newY = 1 ;
            } else if( newY > this.props.height - this.props.cropHeight - 1 ) {
                newY = this.props.height - this.props.cropHeight - 1 ;
            }
            pos.y = newY;

            // ToDo : boundry condition function
            var newX = lastPosX - xDiff ;
            if( newX < 1 ) {
                newX = 1 ;
            } else if( newX > this.props.width - this.props.cropWidth - 1 ) {
                newX =  this.props.width - this.props.cropWidth - 1;
            }
            pos.x = newX;

        }

        this.setState(newState);
    },

    render() {

        var attributes = {
            width: this.props.width,
            height: this.props.height,
            style: this.props.style
        };

        attributes[deviceEvents.react.down] = this.handleMouseDown;
        if (isTouchDevice) attributes[deviceEvents.react.mouseDown] = this.handleMouseDown;

        return <canvas ref='canvas' {...attributes} />;
    }
});

export default CropComponent;
