import { Flex, Text, Box, Avatar } from '@chakra-ui/react';

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Marcio Pancheri</Text>
          <Text color="gray.300" fontSize="small">
            mjpancheri@gmail.com
          </Text>
        </Box>
      )}

      <Avatar size="md" name="Marcio Pancheri" src="https://github.com/mjpancheri.png" />
    </Flex>
  );
}