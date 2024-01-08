import {
  Container,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Heading,
  TabProps,
  Box,
  Grid,
} from "@chakra-ui/react";
import React, {useState} from "react";
import InterviewSettingsForm from "./InterviewSettingsForm";
import JobDetailsForm from "./JobDetailsForm";
import RequisitionForm from "./RequisitionDetailsForm";
import DisplayCard from "./PreviewCard";

const CustomTab: React.FC<TabProps> = ({ children, ...props }) => {
  return (
    <Tab p="1rem" fontFamily="Poppins" {...props}>
      {children}
    </Tab>
  );
};

const HomeLayout = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleChangeTab = (index: number, values? : any) => {
    if(index > 2){
      alert(JSON.stringify(values, null, 2));
      setTabIndex(2);
      return;
    }
    setTabIndex(index);
  };

  const handlePrevForm = (index : number) => {
    setTabIndex(index);
  }


  return (
    <Box w="100%">
      <Container maxW="1200px">
        <Heading fontFamily="Poppins" fontSize="1.5rem" my="2rem">
          Create Candidate Requisition
        </Heading>
        <Tabs isLazy onChange={(index) => handleChangeTab(index)} index={tabIndex}>
          <TabList>
            <CustomTab>Requistion Details</CustomTab>
            <CustomTab>Job Details</CustomTab>
            <CustomTab>Interview Settings</CustomTab>
          </TabList>
          <Grid display="grid" gridTemplateColumns="3fr 2fr" gap="24px">
            <TabPanels>
              <TabPanel>
                <RequisitionForm setTabIndex={setTabIndex}/>
              </TabPanel>
              <TabPanel>
                <JobDetailsForm setTabIndex={setTabIndex} 
                handlePrevForm={handlePrevForm}/>
              </TabPanel>
              <TabPanel>
                <InterviewSettingsForm handlePrevForm={handlePrevForm}/>
              </TabPanel>
            </TabPanels>
            <DisplayCard />
          </Grid>
        </Tabs>
      </Container>
    </Box>
  );
};

export default HomeLayout;
