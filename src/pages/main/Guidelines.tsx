import { Heading, ListItem, OrderedList } from "@chakra-ui/react";
import { AnimateElement } from "../../components/animations/MotionAnimations";
import "./Guidelines.css";
import { Text } from '@chakra-ui/react'

export function Guidelines(): JSX.Element {
  return (
    <div>
      <ActualGuidelines />
    </div>
  );
}

function FunnyGuidelines() {
  return (
    <div className="Guideline-Container">
      <p>
        In an effort to maintain a respectful and civil user environment, we ask
        that all users refrain from posting any content that could be considered
        offensive towards Dr. Vargas-Perez. This includes, but is not limited
        to, posting his jokes without permission, personal attacks on using
        Sublime, or any other content that could be considered disrespectful.
        Kraigslist believes that maintaining a respectful community is essential
        to the success of Kragislist, and we thank you for your cooperation.
      </p>
    </div>
  );
}

function ActualGuidelines() {
  return (
    <div className="Guideline-ParentContainer">
      <AnimateElement keyName="Guidelines">
        <div className="Guideline-Container">
          <Heading fontSize={"2xl"} className="Guideline-Header">Kraigslist's Guidelines</Heading>

          <Text fontSize='md' fontWeight={"600"} className="Guideline-Text">
            In an effort to maintain a respectful and civil user environment, we
            ask that all users refrain from posting any content that could be
            considered offensive towards Dr. Vargas-Perez. This includes, but is
            not limited to, posting his jokes without permission, personal
            attacks on using Sublime, or any other content that could be
            considered disrespectful. Kraigslist believes that maintaining a
            respectful community is essential to the success of Kragislist, and
            we thank you for your cooperation. And remember, keep it kool!
          </Text>

          <OrderedList className="Guideline-Container-Items, Guideline-Text-Items">
            <ListItem>
              <Text fontSize={"md"} >
                Do not post offensive content. This includes, but is not limited
                to, content that is racist, sexist, homophobic, or otherwise
                discriminatory.
              </Text>
            </ListItem>

            <ListItem>
              <Text fontSize='md' >
                Do not engage in personal attacks. This includes, but is not
                limited to, name-calling, insults, and general harassment.
              </Text>
            </ListItem>

            <ListItem>
              <Text fontSize='md' >
                Do not post threatening or harassing content. This includes, but
                is not limited to, content that threatens or harasses other users,
                or that encourages others to do so.
              </Text>
            </ListItem>

            <ListItem>
              <Text fontSize='md' >
                Do not post illegal content. This includes, but is not limited to,
                content that is copyrighted, that violates local law, or that is
                otherwise illegal.
              </Text>
            </ListItem>

            <ListItem>
              <Text fontSize='md' >
                Do not post irrelevant content. This includes, but is not limited
                to, content that is off-topic, that is not related to the subject
                of the forum, or that is otherwise irrelevant.
              </Text>
            </ListItem>

            <ListItem>
              <Text fontSize='md' >
                Do not post excessively. This includes, but is not limited to,
                posting multiple times in a row, or posting excessively large or
                small amounts of content.
              </Text>
            </ListItem>

            <ListItem>
              <Text fontSize='md' >
                Do not circumvent the site's rules. This includes, but is not
                limited to, attempting to bypass the site's content filters, or
                otherwise trying to subvert the site's rules.
              </Text>
            </ListItem>
          </OrderedList>
        </div>
      </AnimateElement>
    </div>
  );
}
