import React from 'react';
import PropTypes from 'prop-types';

import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Image from 'grommet/components/Image';
import Paragraph from 'grommet/components/Paragraph';

import imgOverview1 from '../../images/overview-1.jpg';
import imgOverview2 from '../../images/overview-2.jpg';
import imgOverview3 from '../../images/overview-3.jpg';
import imgOverview4 from '../../images/overview-4.jpg';
import imgOverview5 from '../../images/overview-5.jpg';

function KenyaInfoProjectOverview(props) {
  return (
    <Box
      className="wildcam-info-page"
      pad={{ vertical: 'medium', horizontal: 'large' }}
    >
      <Heading tag="h2">Project Overview</Heading>
      
      <Heading tag="h3">Giraffe Distribution</Heading>
      <Box margin={{ bottom: 'medium' }}>
        <Paragraph>As giraffe populations continue to decline, their range throughout Africa continues to decrease. Much of their habitat is becoming increasingly fragmented with many populations now restricted to small, localized areas. However, similar to their ecology, the distribution of giraffe throughout Africa has been widely understudied. </Paragraph>
        <Paragraph>In order to better understand the distribution of giraffe populations throughout Africa, we are working closely with Giraffe Conservation Foundation, Smithsonian Conservation Biology Institute, Vulcan Inc., in addition to others, to incorporate all the latest data to develop accurate and updated distribution maps for giraffe. </Paragraph>
        <Paragraph>These new distribution maps will be submitted to IUCN and will help guide conservation management strategies to better conserve giraffe populations in areas of their range. </Paragraph>
        <Anchor href={imgOverview1} target="_blank"><Image className="full-image" src={imgOverview1} size="large" caption="" /></Anchor>
      </Box>
      
      <Heading tag="h3">The Twiga Walinzi Initiative</Heading>
      <Box margin={{ bottom: 'medium' }}>
        <Paragraph>The Twiga Walinzi Initiative began in 2016 as a collaboration between San Diego Zoo Global, Giraffe Conservation Foundation, Northern Rangelands Trust, Loisaba Conservancy, Namunyak Conservancy, and Kenya Wildlife Service, aimed at reversing the decline in giraffe populations and bolstering local conservation efforts. Since then, it has grown from 5 research associates at 2 conservancies to 16 Twiga Walinzi research associates and 10 conservancy rangers working in over 10 conservancies!</Paragraph>
        <Paragraph>The Twiga Walinzi team is the heart of the Initiative. The team, all from their local conservancies, are leaders in wildlife conservation and working with their communities. The Twiga Walinzi conduct all the field studies on giraffe, monitor individual animals, engage with communities and local governments, and assist with giraffe orphan rescues when possible and needed.</Paragraph>
        <Paragraph>To date our research has focused on understanding how many giraffe there are, what areas they use, which types of habitat are important, the impacts of large-scale infrastructure on their populations, and their movements between areas. Importantly, we are also working to understand how people, livestock and giraffe sustainably co-exist, how people view and act toward giraffe, and how poaching dynamics pose a threat to giraffe. </Paragraph>
      </Box>
      
      <Heading tag="h3">Where are these cameras located? </Heading>
      <Box margin={{ bottom: 'medium' }}>
        <Paragraph>The Twiga Walinzi on-the-ground research teams are headquartered at Loisaba Conservancy, in Laikipia County, and at Namunyak Community Conservancy, in Samburu County. While we work closely with many other conservancies in northern Kenya, currently we only have trail camera surveys setup at Loisaba and Namunyak. </Paragraph>
        <Paragraph>The map below shows Loisaba and Namunyak Conservancies in red, our companion conservancies in gray, and the overlap reticulated giraffe distribution in Northern Kenya (as shown by the shaded area). </Paragraph>
        <Anchor href={imgOverview2} target="_blank"><Image className="full-image" src={imgOverview2} size="large" caption="" /></Anchor>
      </Box>
      
      <Heading tag="h3">The Cameras! </Heading>
      <Box margin={{ bottom: 'medium' }}>
        <Paragraph>We created a grid trail cameras on both conservancies to gain a better understanding of giraffe habitat preference, movement patterns, and occupancy, as well as gathering data on other wildlife species, and livestock. These motion-activated trail cameras are placed in the field for about 3-6 weeks at a time and have captured an array of wildlife images. While Loisaba and Namunyak don’t appear to be located very far from each other (about a 45 minute plane ride or an 8-hour drive!), their vegetation composition and climate are vastly different. </Paragraph>
        <Anchor href={imgOverview5} target="_blank"><Image className="full-image" src={imgOverview5} size="large" caption="" /></Anchor>
      </Box>
      
      <Heading tag="h3">Namunyak Conservancy</Heading>
      <Box margin={{ bottom: 'medium' }}>
        <Paragraph>Namunyak is part of the Northern Rangelands Trust community conservancy system and is estimated to support a human population of over 4,500, most of which reside on the western side of the conservancy (Ruppert et al., 2020). The livelihood of the community is predominately pastoralist, thus livestock grazing occurs throughout most of the conservancy, with grazing density varying. The conservancy supports a vital and dynamic population of reticulated giraffe in addition to wild dog, cheetah, and elephant. </Paragraph>
        <Paragraph>The vegetation throughout the conservancy is diverse in both structure and vegetation and is characterized by vastly different wet and dry seasons. While the majority of the conservancy is characterized as arid scrubland, a large mountain range, the Mathews, does span from north to south throughout the length of the conservancy and due to its significant elevation change, support a drastically different vegetation and climate than the lower rangelands (De Jong &amp; Butynski, 2010).</Paragraph>
        <Anchor href={imgOverview3} target="_blank"><Image className="full-image" src={imgOverview3} size="large" caption="" /></Anchor>
      </Box>
      
      <Heading tag="h3">Loisaba Conservancy</Heading>
      <Box margin={{ bottom: 'medium' }}>
        <Paragraph>Loisaba Conservancy is private conservancy located with the Laikipia plateau (0.626597, 36.812327). The conservancy covers approximately 56,000 acres of open grassland and acacia scrub and hosts large and critical populations of elephants, zebra, impala, reticulated giraffe, and large carnivores like lion, leopard, and cheetah. Sitting at the base of Mt. Kenya, is elevation at Loisaba creates a much milder climate than Namunyak and thus more open savannah grasslands are present. Community lands are present on many sides on Loisaba Conservancy and recent data indicate that wildlife frequently travel between conservancy and community lands. </Paragraph>
        <Anchor href={imgOverview4} target="_blank"><Image className="full-image" src={imgOverview4} size="large" caption="" /></Anchor>
      </Box>
      
      <Heading tag="h3">References</Heading>
      <Box margin={{ bottom: 'medium' }}>
        <Paragraph>De Jong, Y. A., &amp; Butynski, T. M. (2010). Assessment of the primates, large mammals and birds of the Mathews Range Forest Reserve, central Kenya. Unpublished report to The Nature Conservancy, Washington DC.</Paragraph>
        <Paragraph>Ruppert, K. A., Sponarski, C. C., Davis, E., Masiaine, S., Larpei, L., Lekalgitele, J., ... &amp; Glikman, J. A. (2020). Use of Specialized Questioning Techniques to Detect Decline in Giraffe Meat Consumption.</Paragraph>
      </Box>
      
    </Box>
  );
};

KenyaInfoProjectOverview.defaultProps = {};

KenyaInfoProjectOverview.propTypes = {};

export default KenyaInfoProjectOverview;
