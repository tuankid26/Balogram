// import Carousel, { Pagination } from 'react-native-snap-carousel';
import React, { Component } from 'react';
import { Dimensions, Text, Image, StyleSheet } from 'react-native';
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
                { uri: 'https://huyhoanhotel.com/wp-content/uploads/2016/05/765-default-avatar.png' },
                { uri: 'https://scontent.fhan4-1.fna.fbcdn.net/v/t1.6435-9/244520515_3096913173887080_9068290061693727736_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=730e14&_nc_ohc=pli3EOhcKDMAX-Iu9M3&tn=Zogvr7y4JkPiykhT&_nc_ht=scontent.fhan4-1.fna&oh=25716daf385d1e8753b89a118a5b3525&oe=61ABEF92' },
                { uri: 'https://scontent.fhan3-1.fna.fbcdn.net/v/t1.6435-9/s1080x2048/243201783_1590178084649380_404865264472673045_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=a4a2d7&_nc_ohc=7oNAIVv4WekAX_kxcpS&tn=Zogvr7y4JkPiykhT&_nc_ht=scontent.fhan3-1.fna&oh=c837720bf7db30dc119de852fc8f3027&oe=61AFF821' }
            ]
        }
    }

    _renderItem({ item, index }) {
        return (
            <View key={index} style={styles.container}>
                <Image
                    source={{
                        uri: item.uri,
                    }}
                    alt="Image Alt"
                    style={styles.image}
                />
            </View>
        )
    }

    // get pagination() {
    //     const { entries, activeSlide } = this.state;
    //     return (
    //         <Pagination
    //             dotsLength={entries.length}
    //             activeDotIndex={activeSlide}
    //             dotStyle={{
    //                 backgroundColor: theme.colors.black
    //             }}
    //             containerStyle={{
    //                 paddingTop: 10,
    //                 paddingBottom: 0,
    //             }}
    //             inactiveDotOpacity={0.4}
    //             inactiveDotScale={0.6}
    //         />
    //     );
    // }

    render() {
        const sliderWidth = Dimensions.get('window').width;
        const itemHeight = Dimensions.get('window').height;

        return (
            <View>
                {/* <Carousel
                    layout='tinder'
                    sliderWidth={screenWidth}
                    sliderHeight={screenWidth}
                    itemWidth={screenWidth - 10}
                    data={this.state.images}
                    renderItem={this._renderItem}
                    onSnapToItem={index => this.setState({ activeSlide: index })}
                    hasParallaxImages={true}
                    // lockScrollWhileSnapping={true}
                /> */}
                {/* {this.pagination} */}
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
        // borderWidth: 1
    },
    image: {
        width: 350,
        height: 400,
        maxHeight: 400
    },
    container: {
        height: 400,
        width: 400
    }
})