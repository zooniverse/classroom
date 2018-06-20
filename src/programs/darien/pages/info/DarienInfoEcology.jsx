import React from 'react';
import PropTypes from 'prop-types';

import DarienNavi from '../../common/DarienNavi';

import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Image from 'grommet/components/Image';
import Paragraph from 'grommet/components/Paragraph';

function DarienInfoEcology(props) {
  return (
    <Box>
      <DarienNavi />
      <Box
        className="wildcam-info-page"
        pad={{ vertical: 'medium', horizontal: 'large' }}
      >
        <Heading tag="h2">Ecology</Heading>
        <Image src="https://placeimg.com/400/250/nature" size="large" />
        <Paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pellentesque pellentesque egestas. In vitae convallis mauris. Mauris vitae dapibus nunc. Mauris porttitor elit ac elit ultricies, id maximus eros efficitur. Integer lacus turpis, dapibus quis mi et, facilisis condimentum nulla. Vestibulum venenatis turpis eu mi mollis, id viverra erat ultrices. Maecenas et tristique diam. Pellentesque at eros sit amet massa sodales facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla a justo neque. Vestibulum id faucibus sapien, sed laoreet tortor. Quisque eget purus libero. Donec scelerisque velit ac erat tristique sagittis. Donec id urna at quam hendrerit imperdiet sed eleifend nulla. Interdum et malesuada fames ac ante ipsum primis in faucibus. Phasellus ac maximus orci.</Paragraph>
        <Paragraph>Aliquam consequat et odio ut vehicula. Cras nec hendrerit nisl. Curabitur tincidunt enim feugiat sapien volutpat eleifend non non massa. Phasellus vel dictum velit. Proin imperdiet, sem lacinia cursus vestibulum, urna est dictum massa, ac ultricies tellus libero sodales purus. Aenean luctus gravida tortor, sit amet pulvinar libero varius sit amet. Proin ante purus, mollis id lobortis ut, consequat interdum eros. Duis lacinia urna ac ex rutrum laoreet. Nam ac tincidunt tellus, ultricies sodales nibh. Sed pulvinar diam id auctor ultricies. Donec porta sed mauris a luctus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;</Paragraph>
        <Image src="https://placeimg.com/400/250/animals" caption="Example caption 1" alt="Example image 1" size="large" />
        <Paragraph>Sed sed cursus tortor, efficitur lobortis eros. Vestibulum orci tortor, posuere eget augue vitae, dictum ultricies ipsum. Duis id tempor mauris, et consectetur turpis. Aliquam quis tempor tellus, ut semper diam. Duis in bibendum ex. In ut nunc dolor. Mauris et dolor ex. Praesent rutrum ultricies arcu dictum convallis. Curabitur ut magna quis velit tincidunt tincidunt at nec dolor. Donec pharetra ultricies odio at ullamcorper. Suspendisse potenti. Sed ut faucibus enim. Suspendisse potenti. Phasellus et metus pulvinar, sagittis urna sed, lacinia libero. Quisque gravida, mauris eget accumsan scelerisque, mauris felis tempus neque, in tempus purus lectus ut arcu.</Paragraph>
        <Paragraph>Curabitur convallis gravida imperdiet. Vivamus at lectus lacinia, volutpat dolor imperdiet, dignissim risus. Nunc faucibus posuere turpis quis condimentum. Suspendisse mattis ex vel arcu pellentesque blandit. Quisque vestibulum ligula dolor, eget luctus arcu ultrices vitae. Ut sed magna vulputate, semper lorem vel, iaculis odio. Nunc malesuada tellus ipsum, at congue nibh venenatis sed. Proin id dapibus turpis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nam in est tortor. Nunc mattis nunc velit, a malesuada magna imperdiet vitae. Aliquam erat volutpat. Morbi bibendum, tortor eget gravida rhoncus, magna nisl viverra velit, eget tempus ante est in risus. Morbi nec enim velit.</Paragraph>
        <Image src="https://placeimg.com/400/250/nature/sepia" caption="Example caption 2" alt="Example image 2" size="large" />
        <Paragraph>Vestibulum gravida sapien urna, eget blandit tellus sodales non. Nunc dolor ipsum, tincidunt at nisl in, luctus rutrum sem. Donec semper luctus turpis, vitae euismod erat tincidunt quis. Duis vitae cursus nisi. Duis molestie mollis urna a posuere. Mauris suscipit lacus in ultricies dignissim. Nam venenatis aliquet ante ac molestie. Vestibulum quis tortor est. Proin varius porta nulla. Cras id libero quis purus tincidunt ultrices. Pellentesque et ultricies nulla, ut hendrerit leo. </Paragraph>
        
      </Box>
    </Box>
  );
};

DarienInfoEcology.defaultProps = {};

DarienInfoEcology.propTypes = {};

export default DarienInfoEcology;
