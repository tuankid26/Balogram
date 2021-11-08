import Carousel, { Pagination, ParallaxImage } from 'react-native-snap-carousel';
import React, { Component } from 'react';
import { Dimensions, Text, Image, StyleSheet } from 'react-native';
import img from '../images/Store_local_image/anh1.jpg'
import {
    View,
} from 'react-native';

import { theme } from './core/theme';

const { width: screenWidth } = Dimensions.get('window')

export default class MyCarousel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            entries: props.item,
            activeSlide: props.index,
            images: [
                img,
                img, 
                img
            ]
        }
    }

    _renderItem({ item, index }, parallaxProps) {
        return (
            <View style={styles.container}>
                <ParallaxImage
                    source={img}
                    containerStyle={styles.imageContainer}
                    style={styles.image}
                    parallaxFactor={0.4}
                    {...parallaxProps}
                // showSpinner={false}
                />
            </View>
        )
    }

    get pagination() {
        const { entries, activeSlide } = this.state;
        return (
            <Pagination
                dotsLength={entries.length}
                activeDotIndex={activeSlide}
                dotStyle={{
                    backgroundColor: theme.colors.black
                }}
                containerStyle={{
                    paddingTop: 10,
                    paddingBottom: 0,
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
        );
    }

    render() {
        const sliderWidth = Dimensions.get('window').width;
        const itemHeight = Dimensions.get('window').height;

        return (
            <View>
                <Carousel
                    layout='tinder'
                    sliderWidth={screenWidth}
                    sliderHeight={screenWidth}
                    itemWidth={screenWidth - 10}
                    data={this.state.images}
                    renderItem={this._renderItem}
                    onSnapToItem={index => this.setState({ activeSlide: index })}
                    hasParallaxImages={true}
                    // lockScrollWhileSnapping={true}
                />
                {this.pagination}
            </View>
        );

    }
}

const styles = StyleSheet.create({
    item: {
        width: screenWidth - 60,
        height: screenWidth - 60,
    },
    imageContainer: {
        borderRadius: 8,
        borderWidth: 1
    },
    image: {
        resizeMode: 'cover',
    },
    container: {
        height: 250,
        // backgroundColor: theme.colors.black
    }
})