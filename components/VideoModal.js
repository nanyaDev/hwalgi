// prettier-ignore
import { Button, Icon, Modal, ModalBody, ModalContent, ModalOverlay, useDisclosure, } from '@chakra-ui/react';
import { FaPlay } from 'react-icons/fa';

const VideoModal = ({ children, trailer }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // ? the size="6xl" on modal is weird
  return (
    <>
      <Button
        onClick={onOpen}
        color="gray.500"
        variant="ghost"
        leftIcon={<Icon as={FaPlay} />}
      >
        {children}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay />
        <ModalContent bg="black" w="1003px" h="546px">
          <ModalBody p={0}>
            <iframe
              width="1003"
              height="546"
              src={`https://www.youtube.com/embed/${trailer}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default VideoModal;
