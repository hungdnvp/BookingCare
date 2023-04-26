import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';


class HomeFooter extends Component {

    render() {
       
        return (
            <div className='home-footer'>
                <p>&copy;2023 Quang Hung Booking care . <a href='#'>More information, please visit my fanpage ww.facebook.com/qhung.</a></p>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
