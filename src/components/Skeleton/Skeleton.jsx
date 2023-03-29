import React from 'react';
import { Box, Flex, SkeletonText } from '@chakra-ui/react';

const SkeletonBox = props => {
  const list = [1, 2, 3, 4, 5];
  return (
    <>
      <Flex align="center" justify="center">
        {list.map(item => {
          return (
            <Box key={item}>
              <Box maxW="md">
                <SkeletonText mt="2" spacing="4" skeletonHeight="4" />
              </Box>
            </Box>
          );
        })}
      </Flex>
    </>
  );
};

export default SkeletonBox;
