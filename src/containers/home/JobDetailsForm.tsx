import { Button, Flex, Box } from "@chakra-ui/react";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import FormInput from "../../components/formComponents/FormInput";
import { IJobDetails } from "../../interface/forms";
import { useData } from '../../containers/home/DataProvider';


interface IProps {
  setTabIndex : React.Dispatch<React.SetStateAction<number>>;
  handlePrevForm : (index : number) => void;
}

const JobDetailsForm: React.FC<IProps> = ({setTabIndex, handlePrevForm}) => {
  const states = useData();
  const { 
    handleChange, 
    errors, 
    touched, 
    handleBlur, 
    handleSubmit, 
    values } =
    useFormik<IJobDetails>({
      initialValues: {
        jobTitle: states?.state.jobDetails.jobTitle || "",
        jobDetails: states?.state.jobDetails.jobDetails || "",
        jobLocation: states?.state.jobDetails.jobLocation || "",
      },
      validationSchema: Yup.object().shape({
        jobTitle: Yup.string().required("Job Title is required"),
        jobDetails: Yup.string().required("Job Details is required"),
        jobLocation: Yup.string().required("Job Location is required"),
      }),
      onSubmit: (values) => {
        setTabIndex(2);
      },
    });

  return (
    <Box width="100%" as="form" onSubmit={handleSubmit}>
      <Box width="100%">
        <FormInput
          label="Job Title"
          placeholder="Enter job title"
          name="jobTitle"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values?.jobTitle}
          error={errors?.jobTitle}
          touched={touched?.jobTitle}
          formType="jobDetails"
        />
        <FormInput
          label="Job Details"
          placeholder="Enter job details"
          name="jobDetails"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values?.jobDetails}
          error={errors?.jobDetails}
          touched={touched?.jobDetails}
          formType="jobDetails"
        />
        <FormInput
          label="Job Location"
          name="jobLocation"
          placeholder="Enter job location"
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.jobLocation}
          touched={touched.jobLocation}
          value={values.jobLocation}
          formType="jobDetails"
        />
        <Flex w="100%" justify="flex-end" mt="4rem" gap="20px">
          <Button colorScheme="gray" type="button"  onClick={() => handlePrevForm(0)}>
            Previous
          </Button>
          <Button colorScheme="red" type="submit">
            Next
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default JobDetailsForm;
