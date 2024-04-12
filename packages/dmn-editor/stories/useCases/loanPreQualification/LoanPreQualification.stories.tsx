/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { getMarshaller } from "@kie-tools/dmn-marshaller";
import { Empty } from "../../misc/empty/Empty.stories";
import { DmnEditor, DmnEditorProps } from "../../../src/DmnEditor";
import { StorybookDmnEditorProps } from "../../dmnEditorStoriesWrapper";

export const loanPreQualificationDmn = `<?xml version="1.0" encoding="UTF-8" ?>
<dmn:definitions xmlns:dmn="http://www.omg.org/spec/DMN/20180521/MODEL/" 
    xmlns:di="http://www.omg.org/spec/DMN/20180521/DI/"
    xmlns:kie="https://kie.apache.org/dmn/extensions/1.0"
    xmlns:dmndi="http://www.omg.org/spec/DMN/20180521/DMNDI/" 
    xmlns:dc="http://www.omg.org/spec/DMN/20180521/DC/" 
    xmlns:feel="http://www.omg.org/spec/DMN/20180521/FEEL/" 
    xmlns:included0="https://kie.apache.org/dmn/_923784BD-CD31-488A-9C31-C1A83C5483C0" 
    xmlns:included1="https://kie.apache.org/dmn/_D19B0015-2CBD-4BA8-84A9-5F554D84A9E1"
    expressionLanguage="http://www.omg.org/spec/DMN/20180521/FEEL/" 
    typeLanguage="http://www.omg.org/spec/DMN/20211108/FEEL/"
    namespace="https://kie.apache.org/dmn/_857FE424-BEDA-4772-AB8E-2F4CDDB864AB" 
    id="_C6CBECEB-2BBC-4E14-80B0-17F576B2CF92" 
    name="loan_pre_qualification">
  <dmn:extensionElements />
  <dmn:itemDefinition id="_D40B0106-62E8-4AC0-A39A-C6C9506194A9" name="Requested_Product" isCollection="false">
    <dmn:itemComponent id="_68b4a96c-198a-4575-b29a-a2c8b0539a2c" name="Type" isCollection="false">
      <dmn:typeRef>Product_Type</dmn:typeRef>
    </dmn:itemComponent>
    <dmn:itemComponent id="_ab1647c2-cb63-4808-8d90-36d41591a40c" name="Rate" isCollection="false">
      <dmn:typeRef>number</dmn:typeRef>
    </dmn:itemComponent>
    <dmn:itemComponent id="_152917bb-6095-4057-8613-5b08b77db235" name="Term" isCollection="false">
      <dmn:typeRef>number</dmn:typeRef>
    </dmn:itemComponent>
    <dmn:itemComponent id="_e2f0e8cd-8f5a-43d4-b263-aaa5b9ae4420" name="Amount" isCollection="false">
      <dmn:typeRef>number</dmn:typeRef>
    </dmn:itemComponent>
  </dmn:itemDefinition>
  <dmn:itemDefinition id="_2B4E9593-3239-4E04-A213-345F0AA0AF9D" name="Marital_Status" isCollection="false">
    <dmn:typeRef>string</dmn:typeRef>
    <dmn:allowedValues id="_5BD13D9D-412F-4E6B-914A-3D8AAAC6A705">
      <dmn:text>&quot;M&quot;,&quot;D&quot;,&quot;S&quot;</dmn:text>
    </dmn:allowedValues>
  </dmn:itemDefinition>
  <dmn:itemDefinition id="_F090CBB7-F5C3-4C54-9905-517DC1469B52" name="Applicant_Data" isCollection="false">
    <dmn:itemComponent id="_f52e2b9f-544c-48ac-91e0-168a6e13fc8b" name="Age" isCollection="false">
      <dmn:typeRef>number</dmn:typeRef>
    </dmn:itemComponent>
    <dmn:itemComponent id="_5a20d4c2-0e66-4bb9-b5ea-3b9f2cd8e050" name="Marital Status" isCollection="false">
      <dmn:typeRef>Marital_Status</dmn:typeRef>
    </dmn:itemComponent>
    <dmn:itemComponent id="_701117b8-2f8d-4e94-a5db-d503f0fba3af" name="Employment Status" isCollection="false">
      <dmn:typeRef>string</dmn:typeRef>
      <dmn:allowedValues id="_4A8E36FC-A40C-4CB5-9AE1-73082DA24D13">
        <dmn:text>&quot;Unemployed&quot;,&quot;Employed&quot;,&quot;Self-employed&quot;,&quot;Student&quot;</dmn:text>
      </dmn:allowedValues>
    </dmn:itemComponent>
    <dmn:itemComponent id="_17ad2a24-425f-4df7-92fc-609e10217b8b" name="Existing Customer" isCollection="false">
      <dmn:typeRef>boolean</dmn:typeRef>
    </dmn:itemComponent>
    <dmn:itemComponent id="_bb9ef72e-2e0d-4175-ba58-d613bda7e9b3" name="Monthly" isCollection="false">
      <dmn:itemComponent id="_32d5ea39-4bbc-4b16-88cd-f7e6e47a885e" name="Income" isCollection="false">
        <dmn:typeRef>number</dmn:typeRef>
      </dmn:itemComponent>
      <dmn:itemComponent id="_7850468b-173d-4162-9c7a-94453a4b02d7" name="Repayments" isCollection="false">
        <dmn:typeRef>number</dmn:typeRef>
      </dmn:itemComponent>
      <dmn:itemComponent id="_af578182-5c71-4b71-9027-0f0cf83770ab" name="Expenses" isCollection="false">
        <dmn:typeRef>number</dmn:typeRef>
      </dmn:itemComponent>
      <dmn:itemComponent id="_4a4d01be-fe97-49a2-8c4c-3a49ff27968d" name="Tax" isCollection="false">
        <dmn:typeRef>number</dmn:typeRef>
      </dmn:itemComponent>
      <dmn:itemComponent id="_f95dbf70-d256-4d40-a61d-c6332d864e8f" name="Insurance" isCollection="false">
        <dmn:typeRef>number</dmn:typeRef>
      </dmn:itemComponent>
    </dmn:itemComponent>
  </dmn:itemDefinition>
  <dmn:itemDefinition id="_1945BD2E-C82C-4E7A-A59E-484B56A3AE46" name="Post-Bureau_Risk_Category" isCollection="false">
    <dmn:itemComponent id="_19ecc622-e72c-482d-9de3-6578a1c76f1e" name="Risk Category" isCollection="false">
      <dmn:typeRef>Risk_Category</dmn:typeRef>
    </dmn:itemComponent>
    <dmn:itemComponent id="_2fa724d1-b276-4a3f-a2ef-2e7db3d362f3" name="Credit Contingency Factor" isCollection="false">
      <dmn:typeRef>number</dmn:typeRef>
    </dmn:itemComponent>
  </dmn:itemDefinition>
  <dmn:itemDefinition id="_4816704B-AB7F-4624-8368-0BBBAFC04FB9" name="Pre-Bureau_Risk_Category" isCollection="false">
    <dmn:itemComponent id="_78b44e10-e166-44a4-83a3-5d12c99529e8" name="Risk Category" isCollection="false">
      <dmn:typeRef>string</dmn:typeRef>
    </dmn:itemComponent>
    <dmn:itemComponent id="_fa41a482-a86a-4b52-a750-35170cd6bba3" name="Credit Contingency Factor" isCollection="false">
      <dmn:typeRef>number</dmn:typeRef>
    </dmn:itemComponent>
  </dmn:itemDefinition>
  <dmn:itemDefinition id="_9AEAE50E-67BF-4428-A6CD-B48D299FD73C" name="Eligibility" isCollection="false">
    <dmn:typeRef>string</dmn:typeRef>
    <dmn:allowedValues id="_79C7F45D-228F-437B-AF7E-615FC72A5354">
      <dmn:text>&quot;Ineligible&quot;,&quot;Eligible&quot;</dmn:text>
    </dmn:allowedValues>
  </dmn:itemDefinition>
  <dmn:itemDefinition id="_FBF245E7-9A93-4D52-9F02-AF6893011A5F" name="Strategy" isCollection="false">
    <dmn:typeRef>string</dmn:typeRef>
    <dmn:allowedValues id="_0B005355-19D0-447B-B2DE-6D1290C7504C">
      <dmn:text>&quot;Decline&quot;,&quot;Bureau&quot;,&quot;Through&quot;</dmn:text>
    </dmn:allowedValues>
  </dmn:itemDefinition>
  <dmn:itemDefinition id="_5D34E713-E94E-403E-A681-DD6948BE4F79" name="Bureau_Call_Type" isCollection="false">
    <dmn:typeRef>string</dmn:typeRef>
    <dmn:allowedValues id="_947DBBA1-70A0-42DA-BC37-FD2FD93BF61B">
      <dmn:text>&quot;Full&quot;,&quot;Mini&quot;,&quot;None&quot;</dmn:text>
    </dmn:allowedValues>
  </dmn:itemDefinition>
  <dmn:itemDefinition id="_9AF58ED6-A526-4346-8780-0D1E6038CA6F" name="Product_Type" isCollection="false">
    <dmn:typeRef>string</dmn:typeRef>
    <dmn:allowedValues id="_A2554140-8060-4F66-BA16-3A8DFE12C17C">
      <dmn:text>&quot;Standard Loan&quot;,&quot;Special Loan&quot;</dmn:text>
    </dmn:allowedValues>
  </dmn:itemDefinition>
  <dmn:itemDefinition id="_4D36A25E-9A37-47AE-B9BF-94338AE67609" name="Risk_Category" isCollection="false">
    <dmn:typeRef>string</dmn:typeRef>
    <dmn:allowedValues id="_041426C2-B9D2-4C18-9AC3-5A508D000839">
      <dmn:text>&quot;High&quot;,&quot;Medium&quot;,&quot;Low&quot;,&quot;Very Low&quot;,&quot;Decline&quot;</dmn:text>
    </dmn:allowedValues>
  </dmn:itemDefinition>
  <dmn:itemDefinition id="_46C870FC-2A99-43A0-9D1B-3D3C5516FB23" name="Credit_Score_Rating" isCollection="false">
    <dmn:typeRef>string</dmn:typeRef>
    <dmn:allowedValues id="_8470AE69-2814-4911-953D-3FC61A681063">
      <dmn:text>&quot;Poor&quot;,&quot;Bad&quot;,&quot;Fair&quot;,&quot;Good&quot;,&quot;Excellent&quot;</dmn:text>
    </dmn:allowedValues>
  </dmn:itemDefinition>
  <dmn:itemDefinition id="_7641A6FA-BCF3-45D1-A0B6-71B0634ABB3E" name="Back_End_Ratio" isCollection="false">
    <dmn:typeRef>string</dmn:typeRef>
    <dmn:allowedValues id="_CA1C6F0E-186F-41DD-8D8D-D405789BA3F1">
      <dmn:text>&quot;Insufficient&quot;,&quot;Sufficient&quot;</dmn:text>
    </dmn:allowedValues>
  </dmn:itemDefinition>
  <dmn:itemDefinition id="_B5E00A2D-3C95-4A9C-BCA6-BDE852939F6D" name="Front_End_Ratio" isCollection="false">
    <dmn:typeRef>string</dmn:typeRef>
    <dmn:allowedValues id="_B8658CA2-F472-4390-8AB0-1DD49100B20C">
      <dmn:text>&quot;Sufficient&quot;,&quot;Insufficient&quot;</dmn:text>
    </dmn:allowedValues>
  </dmn:itemDefinition>
  <dmn:itemDefinition id="_B8ACE210-2C55-4C66-B3D8-4885EE1C52A0" name="Qualification" isCollection="false">
    <dmn:typeRef>string</dmn:typeRef>
    <dmn:allowedValues id="_1F66B8BF-6AB7-4965-8A69-897DDC1A8B34">
      <dmn:text>&quot;Not Qualified&quot;,&quot;Qualified&quot;</dmn:text>
    </dmn:allowedValues>
  </dmn:itemDefinition>
  <dmn:itemDefinition id="_2CC2E8D7-1BE2-4E4A-8072-55A1EC94DB6E" name="Credit_Score" isCollection="false">
    <dmn:itemComponent id="_d53ce920-87f5-4a4f-baba-85c2a830d60f" name="FICO" isCollection="false">
      <dmn:typeRef>number</dmn:typeRef>
      <dmn:allowedValues id="_E30AADBD-D028-475D-B8D8-B5687D454BED">
        <dmn:text>[300..850]</dmn:text>
      </dmn:allowedValues>
    </dmn:itemComponent>
  </dmn:itemDefinition>
  <dmn:itemDefinition id="_3C37A6F1-C113-4993-BB57-E89B99C70B02" name="Loan_Qualification" isCollection="false">
    <dmn:itemComponent id="_e11c3ac3-7370-4378-967b-91e9cb221fe1" name="Qualification" isCollection="false">
      <dmn:typeRef>string</dmn:typeRef>
      <dmn:allowedValues id="_B0AD0641-0023-461D-B20E-41CAE02F9BE4">
        <dmn:text>&quot;Qualified&quot;,&quot;Not Qualified&quot;</dmn:text>
      </dmn:allowedValues>
    </dmn:itemComponent>
    <dmn:itemComponent id="_b3541f82-5bc9-4fab-ba9b-c423a9a2cd6c" name="Reason" isCollection="false">
      <dmn:typeRef>string</dmn:typeRef>
    </dmn:itemComponent>
  </dmn:itemDefinition>
  <dmn:inputData id="_4C89E59C-FDDA-438C-8D1F-0B1194EF6DAE" name="Credit Score">
    <dmn:extensionElements />
    <dmn:variable id="_A97019FC-EE01-451F-A7AA-5A97ED005FB9" name="Credit Score" typeRef="Credit_Score" />
  </dmn:inputData>
  <dmn:businessKnowledgeModel id="_4C788DBD-C672-4F41-9AFE-9C7D2C145734" name="Lender Acceptable DTI">
    <dmn:extensionElements />
    <dmn:variable id="_85508943-7AD2-4AA0-80E5-20923CA2308D" name="Lender Acceptable DTI" typeRef="number" />
    <dmn:encapsulatedLogic id="_9F0257EE-CF82-49FD-AEDD-3155890864FF" kind="FEEL">
      <dmn:literalExpression id="_21E8FA38-C947-4733-9E52-CF81A97ADF91">
        <dmn:text>0.36</dmn:text>
      </dmn:literalExpression>
    </dmn:encapsulatedLogic>
  </dmn:businessKnowledgeModel>
  <dmn:decision id="_F0DC8923-5FC7-4200-8BD1-461D5F3714BE" name="Front End Ratio">
    <dmn:extensionElements />
    <dmn:variable id="_A0B0B032-F63F-491F-A65E-72E68A86B8FD" name="Front End Ratio" typeRef="Front_End_Ratio" />
    <dmn:informationRequirement id="_89EEAF9F-5A5D-4F59-91B7-EA418A7229AF">
      <dmn:requiredInput href="#_1CF5CEFA-AF97-46F9-9CD5-9A8AEBB20B4E" />
    </dmn:informationRequirement>
    <dmn:informationRequirement id="_87730C5A-5648-415B-9189-EF4D8805F8C9">
      <dmn:requiredInput href="#_6E3205AF-7E3D-4ABE-A367-96F3F6E8210E" />
    </dmn:informationRequirement>
    <dmn:knowledgeRequirement id="_63DE7C3B-A767-4B8A-A098-91ECB4B8D330">
      <dmn:requiredKnowledge href="#_FAF9080E-F4EF-49F7-AEFD-0D2990D8FFDA" />
    </dmn:knowledgeRequirement>
    <dmn:knowledgeRequirement id="_2C95829D-FCF9-44F5-8F5A-0A6CDB60600D">
      <dmn:requiredKnowledge href="#_C98BE939-B9C7-43E0-83E8-EE7A16C5276D" />
    </dmn:knowledgeRequirement>
    <dmn:context id="_08A9C33D-719F-4B05-AC42-D15464798BC4" label="Front End Ratio" typeRef="Front_End_Ratio">
      <dmn:contextEntry id="_C8F98D0F-218F-4B60-BD99-7FD98078FE56">
        <dmn:invocation id="_EB658586-C3C8-488E-8118-E69E31583106" typeRef="&lt;Undefined&gt;">
          <dmn:literalExpression id="_6E79E4D9-BBFB-4E90-8AA3-A6C153C3C946">
            <dmn:text>PITI</dmn:text>
          </dmn:literalExpression>
          <dmn:binding id="_4B93E8C8-A092-4EAC-B23A-CC138225ACC3">
            <dmn:literalExpression id="_51ACEC3C-4207-4F5F-8FDD-9EDAA3270E60" typeRef="&lt;Undefined&gt;">
              <dmn:text>(Requested Product.Amount*((Requested Product.Rate/100)/12))/(1-(1/(1+(Requested Product.Rate/100)/12)**-Requested Product.Term))</dmn:text>
            </dmn:literalExpression>
            <dmn:parameter name="pmt" typeRef="&lt;Undefined&gt;" />
          </dmn:binding>
          <dmn:binding id="_B9D0FB44-605A-42DB-81F7-4DF4C4CC1CDD">
            <dmn:literalExpression id="_5D050B8D-DF55-45FD-988B-9C56BED53D5B" typeRef="&lt;Undefined&gt;">
              <dmn:text>Applicant Data.Monthly.Tax</dmn:text>
            </dmn:literalExpression>
            <dmn:parameter name="tax" typeRef="&lt;Undefined&gt;" />
          </dmn:binding>
          <dmn:binding id="_67372884-0407-4812-986F-3A2CC4C3A7B1">
            <dmn:literalExpression id="_14C44A69-56DB-4B68-B757-4225C80E4D88" typeRef="&lt;Undefined&gt;">
              <dmn:text>Applicant Data.Monthly.Insurance</dmn:text>
            </dmn:literalExpression>
            <dmn:parameter name="insurance" typeRef="&lt;Undefined&gt;" />
          </dmn:binding>
          <dmn:binding id="_EDE0107C-9736-4BB6-9500-173FFAFF00DB">
            <dmn:literalExpression id="_0DB5DE05-A2AD-4013-B191-DC1D1637A132" typeRef="&lt;Undefined&gt;">
              <dmn:text>Applicant Data.Monthly.Income</dmn:text>
            </dmn:literalExpression>
            <dmn:parameter name="income" typeRef="&lt;Undefined&gt;" />
          </dmn:binding>
        </dmn:invocation>
        <dmn:variable name="Client PITI" typeRef="number" />
      </dmn:contextEntry>
      <dmn:contextEntry id="_3F95EFD0-94D7-4D1A-9EA9-C8E12982D7E8">
        <dmn:literalExpression id="_3F95EFD0-94D7-4D1A-9EA9-C8E12982D7E8" typeRef="&lt;Undefined&gt;">
          <dmn:text>if Client PITI &lt;= Lender Acceptable PITI()
then &quot;Sufficient&quot;
else &quot;Insufficient&quot;</dmn:text>
        </dmn:literalExpression>
      </dmn:contextEntry>
    </dmn:context>
  </dmn:decision>
  <dmn:businessKnowledgeModel id="_FAF9080E-F4EF-49F7-AEFD-0D2990D8FFDA" name="PITI">
    <dmn:extensionElements />
    <dmn:variable id="_994F490E-10AC-4704-BFDA-14A3B98A981E" name="PITI" typeRef="number" />
    <dmn:encapsulatedLogic id="_D33D9AEA-49DF-489F-98EC-4B42FF8C2027" label="PITI" kind="FEEL" typeRef="number">
      <dmn:formalParameter id="_664280C1-D5E0-47BE-82EF-0A6579975A62" name="pmt" typeRef="number" />
      <dmn:formalParameter id="_3E7DF0B3-C48B-481D-B092-FC82EC2F6E37" name="tax" typeRef="number" />
      <dmn:formalParameter id="_DF691F86-AD12-46BA-B149-AC875836A116" name="insurance" typeRef="number" />
      <dmn:formalParameter id="_9E2E257F-90EB-4FC4-8DD9-089784E7579E" name="income" typeRef="number" />
      <dmn:literalExpression id="_A32ED4A5-7B89-40F7-BE25-CDB636FE071C" typeRef="&lt;Undefined&gt;">
        <dmn:text>(pmt + tax + insurance) / income</dmn:text>
      </dmn:literalExpression>
    </dmn:encapsulatedLogic>
  </dmn:businessKnowledgeModel>
  <dmn:inputData id="_1CF5CEFA-AF97-46F9-9CD5-9A8AEBB20B4E" name="Applicant Data">
    <dmn:extensionElements />
    <dmn:variable id="_2BBF28D2-DF09-4201-8D7A-5820E260592B" name="Applicant Data" typeRef="Applicant_Data" />
  </dmn:inputData>
  <dmn:decision id="_D6F4234F-15B3-4F5B-B814-5F6FF29D2907" name="Back End Ratio">
    <dmn:extensionElements />
    <dmn:variable id="_5AF571F7-AD41-43DC-ABFD-26672585042F" name="Back End Ratio" typeRef="Back_End_Ratio" />
    <dmn:informationRequirement id="_77BA409B-E00D-4FBC-B522-8F656D4F6F0E">
      <dmn:requiredInput href="#_1CF5CEFA-AF97-46F9-9CD5-9A8AEBB20B4E" />
    </dmn:informationRequirement>
    <dmn:knowledgeRequirement id="_4D441C11-7042-49CF-A42C-17A4348A7F29">
      <dmn:requiredKnowledge href="#_4C788DBD-C672-4F41-9AFE-9C7D2C145734" />
    </dmn:knowledgeRequirement>
    <dmn:knowledgeRequirement id="_3217D655-4484-4733-A9AE-4F9CF30D9924">
      <dmn:requiredKnowledge href="#_DA5CCF62-90A8-4CFC-A137-98B528522588" />
    </dmn:knowledgeRequirement>
    <dmn:context id="_5F9FEA4E-B3FC-4BC2-913E-36B8071FA777" label="Back End Ratio" typeRef="Back_End_Ratio">
      <dmn:contextEntry id="_F3ED9059-400F-4BE8-B250-C2ABCD9FF022">
        <dmn:invocation id="_4A7FC8E0-25EF-4DAF-845A-93BD89C2BC8C" typeRef="&lt;Undefined&gt;">
          <dmn:literalExpression id="_F0E80900-1964-4142-9A05-73E7A2E0F2CD">
            <dmn:text>DTI</dmn:text>
          </dmn:literalExpression>
          <dmn:binding>
            <dmn:literalExpression id="_3D0A1979-E59A-483F-BDA8-138F99BA5AB3" typeRef="&lt;Undefined&gt;">
              <dmn:text>Applicant Data.Monthly.Repayments + Applicant Data.Monthly.Expenses</dmn:text>
            </dmn:literalExpression>
            <dmn:parameter name="d" typeRef="&lt;Undefined&gt;" />
          </dmn:binding>
          <dmn:binding>
            <dmn:literalExpression id="_D985F886-71C0-4F65-8808-2CEF366BECC8" typeRef="&lt;Undefined&gt;">
              <dmn:text>Applicant Data.Monthly.Income</dmn:text>
            </dmn:literalExpression>
            <dmn:parameter name="i" typeRef="&lt;Undefined&gt;" />
          </dmn:binding>
        </dmn:invocation>
        <dmn:variable name="Client DTI" typeRef="number" />
      </dmn:contextEntry>
      <dmn:contextEntry id="_D1F96102-4158-45BB-8C9A-B7A3BE2C0206">
        <dmn:literalExpression id="_D1F96102-4158-45BB-8C9A-B7A3BE2C0206" typeRef="&lt;Undefined&gt;">
          <dmn:text>if Client DTI &lt;= Lender Acceptable DTI()
then &quot;Sufficient&quot;
else &quot;Insufficient&quot;</dmn:text>
        </dmn:literalExpression>
      </dmn:contextEntry>
    </dmn:context>
  </dmn:decision>
  <dmn:decision id="_2FE51DB1-3083-4BF7-AA71-0B0065310E72" name="Credit Score Rating">
    <dmn:extensionElements />
    <dmn:variable id="_82228E41-22D1-4758-97C3-BBFE90EDB5FB" name="Credit Score Rating" typeRef="Credit_Score_Rating" />
    <dmn:informationRequirement id="_31A1B6B2-A2A6-4E03-B898-26573A5CF3BA">
      <dmn:requiredInput href="#_4C89E59C-FDDA-438C-8D1F-0B1194EF6DAE" />
    </dmn:informationRequirement>
    <dmn:decisionTable id="_4ACEFFF0-AD2C-4DB8-9BAD-7BCCFB03F295" label="Credit Score Rating" typeRef="Credit_Score_Rating" hitPolicy="UNIQUE">
      <dmn:input id="_44C93627-629C-48B8-B71A-AE2266A42674">
        <dmn:inputExpression id="_00932A00-5ECE-4AEF-AA68-92E679CEF4AB" typeRef="number">
          <dmn:text>Credit Score.FICO</dmn:text>
        </dmn:inputExpression>
      </dmn:input>
      <dmn:output id="_9C201FAB-B49C-4D22-900B-B4E82D5469FB" name="" typeRef="&lt;Undefined&gt;" />
      <dmn:annotation name="Annotations" />
      <dmn:rule id="_AED703E1-8E56-4D27-A511-3875AD1D122E">
        <dmn:inputEntry id="_E2C9F30B-D529-48D8-A51C-A2ACCC8109B3">
          <dmn:text>&gt;= 750</dmn:text>
        </dmn:inputEntry>
        <dmn:outputEntry id="_A1FF2B2D-EF34-42AD-A45A-5FFDFA21FA6D">
          <dmn:text>&quot;Excellent&quot;</dmn:text>
        </dmn:outputEntry>
        <dmn:annotationEntry>
          <dmn:text></dmn:text>
        </dmn:annotationEntry>
      </dmn:rule>
      <dmn:rule id="_1FA12B9F-288C-42E8-B77F-BE2D3702B7B6">
        <dmn:inputEntry id="_CA5AE067-0E1A-44CA-B85C-912F9ED4594C">
          <dmn:text>[700..750)</dmn:text>
        </dmn:inputEntry>
        <dmn:outputEntry id="_833307A2-B924-422C-A4F5-BFFAB27D86D5">
          <dmn:text>&quot;Good&quot;</dmn:text>
        </dmn:outputEntry>
        <dmn:annotationEntry>
          <dmn:text></dmn:text>
        </dmn:annotationEntry>
      </dmn:rule>
      <dmn:rule id="_11976EBA-60BC-421B-A270-089A45E9B167">
        <dmn:inputEntry id="_75D612D5-D201-4932-8524-E49183F51D2D">
          <dmn:text>[650..700)</dmn:text>
        </dmn:inputEntry>
        <dmn:outputEntry id="_E18FE2B2-729C-41F0-B5CC-0E5E5EA431E3">
          <dmn:text>&quot;Fair&quot;</dmn:text>
        </dmn:outputEntry>
        <dmn:annotationEntry>
          <dmn:text></dmn:text>
        </dmn:annotationEntry>
      </dmn:rule>
      <dmn:rule id="_12F8077F-E601-4882-93E1-31508B1402E1">
        <dmn:inputEntry id="_61374E7D-4EF3-4603-97A1-9D1FABAAA3C8">
          <dmn:text>[600..650)</dmn:text>
        </dmn:inputEntry>
        <dmn:outputEntry id="_75135F4C-6BA7-4180-B726-A0D795B3D7FF">
          <dmn:text>&quot;Poor&quot;</dmn:text>
        </dmn:outputEntry>
        <dmn:annotationEntry>
          <dmn:text></dmn:text>
        </dmn:annotationEntry>
      </dmn:rule>
      <dmn:rule id="_D025254C-9376-4425-8084-451E09243CE2">
        <dmn:inputEntry id="_6C13B507-FB60-40AD-8F5C-2407F1413A5C">
          <dmn:text>&lt; 600</dmn:text>
        </dmn:inputEntry>
        <dmn:outputEntry id="_1FB7308A-E37B-46EA-8070-C67E2388A869">
          <dmn:text>&quot;Bad&quot;</dmn:text>
        </dmn:outputEntry>
        <dmn:annotationEntry>
          <dmn:text></dmn:text>
        </dmn:annotationEntry>
      </dmn:rule>
    </dmn:decisionTable>
  </dmn:decision>
  <dmn:decision id="_21C50763-E49F-4D83-A824-16DA6AA87C64" name="Loan Pre-Qualification">
    <dmn:extensionElements />
    <dmn:variable id="_047A25F5-DEF2-44BD-95B7-FB49A433F878" name="Loan Pre-Qualification" typeRef="Loan_Qualification" />
    <dmn:informationRequirement id="_A3E95B32-2EFD-40AD-B5E4-0A73A1542011">
      <dmn:requiredDecision href="#_D6F4234F-15B3-4F5B-B814-5F6FF29D2907" />
    </dmn:informationRequirement>
    <dmn:informationRequirement id="_0B992F01-BA77-4F06-A830-D8948B467272">
      <dmn:requiredDecision href="#_F0DC8923-5FC7-4200-8BD1-461D5F3714BE" />
    </dmn:informationRequirement>
    <dmn:informationRequirement id="_B6002F33-4888-48C5-B265-636030F8C2DC">
      <dmn:requiredDecision href="#_2FE51DB1-3083-4BF7-AA71-0B0065310E72" />
    </dmn:informationRequirement>
    <dmn:decisionTable id="_EF7F404A-939E-4889-95D8-E4053DD1EED9" label="Loan Pre-Qualification" typeRef="Loan_Qualification" hitPolicy="FIRST">
      <dmn:input id="_58ABD81B-FD16-45C3-9E64-DB271AA917C0">
        <dmn:inputExpression id="_5262441E-F812-4554-AF02-5267BDDF80F5" typeRef="Credit_Score_Rating">
          <dmn:text>Credit Score Rating</dmn:text>
        </dmn:inputExpression>
      </dmn:input>
      <dmn:input id="_36258DA0-E527-429C-8FA1-7DEA63647689">
        <dmn:inputExpression id="_4E9F0E06-85F1-4D10-B30D-FB55741B90BC" typeRef="Back_End_Ratio">
          <dmn:text>Back End Ratio</dmn:text>
        </dmn:inputExpression>
      </dmn:input>
      <dmn:input id="_A102CD8A-C38D-48E4-BC59-CA660D6FBF0A">
        <dmn:inputExpression id="_5D79EEF5-71B2-4360-B59A-215AA5593DCB" typeRef="Front_End_Ratio">
          <dmn:text>Front End Ratio</dmn:text>
        </dmn:inputExpression>
      </dmn:input>
      <dmn:output id="_B895B095-C3D6-48B4-8A50-D2D3B8CC6A45" name="Qualification" typeRef="string" />
      <dmn:output id="_A8D2D3B1-07B3-4619-8DE0-F923F511058B" name="Reason" typeRef="string" />
      <dmn:annotation name="Annotations" />
      <dmn:rule id="_B49E1642-F352-4D2E-92B6-E5DFA59AAFAC">
        <dmn:inputEntry id="_6C83C446-1A9A-4FFC-B30C-23915FF9CC43">
          <dmn:text>&quot;Poor&quot;, &quot;Bad&quot;</dmn:text>
        </dmn:inputEntry>
        <dmn:inputEntry id="_0BC93CB9-FD20-45C8-A498-39E4464B6224">
          <dmn:text>-</dmn:text>
        </dmn:inputEntry>
        <dmn:inputEntry id="_1554A983-B2C1-40A7-9614-50720420F4B2">
          <dmn:text>-</dmn:text>
        </dmn:inputEntry>
        <dmn:outputEntry id="_7B39B964-4E25-4717-92FE-A36F2B39FAB9">
          <dmn:text>&quot;Not Qualified&quot;</dmn:text>
        </dmn:outputEntry>
        <dmn:outputEntry id="_A852F5B6-C5DF-4ADD-8B93-9701F0724912">
          <dmn:text>&quot;Credit Score too low.&quot;</dmn:text>
        </dmn:outputEntry>
        <dmn:annotationEntry>
          <dmn:text></dmn:text>
        </dmn:annotationEntry>
      </dmn:rule>
      <dmn:rule id="_214865F4-C968-438C-A385-6B2823AF1BC3">
        <dmn:inputEntry id="_18617A2A-6DD3-41A9-87D6-68C91554620E">
          <dmn:text>-</dmn:text>
        </dmn:inputEntry>
        <dmn:inputEntry id="_5C70BB81-CAFD-4695-A241-68F441FF9A29">
          <dmn:text>&quot;Insufficient&quot;</dmn:text>
        </dmn:inputEntry>
        <dmn:inputEntry id="_78A3C3A0-EEBC-448B-B1C1-5CFF6C7F2AC5">
          <dmn:text>&quot;Sufficient&quot;</dmn:text>
        </dmn:inputEntry>
        <dmn:outputEntry id="_3C38D181-CCA1-4678-A3DD-0A5CE6D59FDC">
          <dmn:text>&quot;Not Qualified&quot;</dmn:text>
        </dmn:outputEntry>
        <dmn:outputEntry id="_F4284B9F-C77A-429B-A689-E212CFB19CB7">
          <dmn:text>&quot;Debt to income ratio is too high.&quot;</dmn:text>
        </dmn:outputEntry>
        <dmn:annotationEntry>
          <dmn:text></dmn:text>
        </dmn:annotationEntry>
      </dmn:rule>
      <dmn:rule id="_73E96773-064E-49F6-92B2-AA76E6BF6B8A">
        <dmn:inputEntry id="_24A825F0-B8C7-42C9-BBA2-4442CAE6F91A">
          <dmn:text>-</dmn:text>
        </dmn:inputEntry>
        <dmn:inputEntry id="_B7F59A5C-4AF1-4E90-BB0D-83C63A8390E6">
          <dmn:text>&quot;Sufficient&quot;</dmn:text>
        </dmn:inputEntry>
        <dmn:inputEntry id="_09A23FD4-9A98-4C34-9E9B-9E8EE652ABBC">
          <dmn:text>&quot;Insufficient&quot;</dmn:text>
        </dmn:inputEntry>
        <dmn:outputEntry id="_9BF1096A-1AF3-4D21-9273-460DE555F0B6">
          <dmn:text>&quot;Not Qualified&quot;</dmn:text>
        </dmn:outputEntry>
        <dmn:outputEntry id="_4D805BB2-B79E-42C2-A562-674ECBDFA01C">
          <dmn:text>&quot;Mortgage payment to income ratio is too high.&quot;</dmn:text>
        </dmn:outputEntry>
        <dmn:annotationEntry>
          <dmn:text></dmn:text>
        </dmn:annotationEntry>
      </dmn:rule>
      <dmn:rule id="_7C242C58-6CAB-43CF-9235-347A72AE3F9E">
        <dmn:inputEntry id="_9DF2A026-8B87-4C75-BB3D-54FF0E2A2E36">
          <dmn:text>-</dmn:text>
        </dmn:inputEntry>
        <dmn:inputEntry id="_FF3E9782-BE9C-4B0C-A63B-E906F6116251">
          <dmn:text>&quot;Insufficient&quot;</dmn:text>
        </dmn:inputEntry>
        <dmn:inputEntry id="_544687CD-F3A2-46C7-8439-E5E2E7B6483D">
          <dmn:text>&quot;Insufficient&quot;</dmn:text>
        </dmn:inputEntry>
        <dmn:outputEntry id="_5A958D2E-B310-4AB9-BF5B-49623BE5DB55">
          <dmn:text>&quot;Not Qualified&quot;</dmn:text>
        </dmn:outputEntry>
        <dmn:outputEntry id="_F0BD7DC2-A1B6-4CF4-95D0-906DBB540EFC">
          <dmn:text>&quot;Debt to income ratio is too high AND mortgage payment to income ratio is too high.&quot;</dmn:text>
        </dmn:outputEntry>
        <dmn:annotationEntry>
          <dmn:text></dmn:text>
        </dmn:annotationEntry>
      </dmn:rule>
      <dmn:rule id="_C8FA33B1-AF6E-4A59-B7B9-6FDF1F495C44">
        <dmn:inputEntry id="_82FBCEE2-C16C-4FFF-A7F3-5512C211E29B">
          <dmn:text>&quot;Fair&quot;, &quot;Good&quot;, &quot;Excellent&quot;</dmn:text>
        </dmn:inputEntry>
        <dmn:inputEntry id="_BF7CDAE1-66E3-4B06-8729-896453AD7867">
          <dmn:text>&quot;Sufficient&quot;</dmn:text>
        </dmn:inputEntry>
        <dmn:inputEntry id="_41CB6123-8122-4FA4-A5C1-548B92CA31AE">
          <dmn:text>&quot;Sufficient&quot;</dmn:text>
        </dmn:inputEntry>
        <dmn:outputEntry id="_9E0497D0-F2F2-419E-A558-366452B379A1">
          <dmn:text>&quot;Qualified&quot;</dmn:text>
        </dmn:outputEntry>
        <dmn:outputEntry id="_113CA566-6044-4858-B8D9-5ACBA4A91CF4">
          <dmn:text>&quot;The borrower has been successfully prequalified for the requested loan.&quot;</dmn:text>
        </dmn:outputEntry>
        <dmn:annotationEntry>
          <dmn:text></dmn:text>
        </dmn:annotationEntry>
      </dmn:rule>
    </dmn:decisionTable>
  </dmn:decision>
  <dmn:inputData id="_6E3205AF-7E3D-4ABE-A367-96F3F6E8210E" name="Requested Product">
    <dmn:extensionElements />
    <dmn:variable id="_EE05E1C7-67ED-4A71-BDEE-8005259351E8" name="Requested Product" typeRef="Requested_Product" />
  </dmn:inputData>
  <dmn:businessKnowledgeModel id="_DA5CCF62-90A8-4CFC-A137-98B528522588" name="DTI">
    <dmn:extensionElements />
    <dmn:variable id="_2F8921D1-6384-4ECB-848E-CE84A20B2573" name="DTI" typeRef="number" />
    <dmn:encapsulatedLogic id="_478C815E-60C9-4637-AA42-195DF16B63A5" label="DTI" kind="FEEL" typeRef="number">
      <dmn:formalParameter id="_B7A9C222-C560-4D37-A821-0CAC88611F10" name="d" typeRef="number" />
      <dmn:formalParameter id="_43C04721-38F6-4ABF-9F2F-BD2956C05441" name="i" typeRef="number" />
      <dmn:literalExpression id="_064FA88E-B06F-4944-85C3-DA86C3F660DD" typeRef="&lt;Undefined&gt;">
        <dmn:text>d / i</dmn:text>
      </dmn:literalExpression>
    </dmn:encapsulatedLogic>
  </dmn:businessKnowledgeModel>
  <dmn:businessKnowledgeModel id="_C98BE939-B9C7-43E0-83E8-EE7A16C5276D" name="Lender Acceptable PITI">
    <dmn:extensionElements />
    <dmn:variable id="_9D78214B-EC07-4360-8D1B-3D927AC90A20" name="Lender Acceptable PITI" typeRef="number" />
    <dmn:encapsulatedLogic id="_E312D80E-0ECE-4D66-87EB-30DE20890BBC" kind="FEEL">
      <dmn:literalExpression id="_EEDF2C15-7FD7-409F-B23B-F9A198E2135D">
        <dmn:text>0.28</dmn:text>
      </dmn:literalExpression>
    </dmn:encapsulatedLogic>
  </dmn:businessKnowledgeModel>
  <dmndi:DMNDI>
    <dmndi:DMNDiagram id="_1608585F-01C8-4A66-B3E5-F4422D4DD2CA" name="Default DRD" useAlternativeInputDataShape="false">
      <di:extension>
        <kie:ComponentsWidthsExtension>
          <kie:ComponentWidths dmnElementRef="_21E8FA38-C947-4733-9E52-CF81A97ADF91">
            <kie:width>209</kie:width>
          </kie:ComponentWidths>
          <kie:ComponentWidths dmnElementRef="_9F0257EE-CF82-49FD-AEDD-3155890864FF">
            <kie:width>50</kie:width>
            <kie:width>209</kie:width>
          </kie:ComponentWidths>
          <kie:ComponentWidths dmnElementRef="_08A9C33D-719F-4B05-AC42-D15464798BC4">
            <kie:width>50</kie:width>
          </kie:ComponentWidths>
          <kie:ComponentWidths dmnElementRef="_EB658586-C3C8-488E-8118-E69E31583106">
            <kie:width>120</kie:width>
          </kie:ComponentWidths>
          <kie:ComponentWidths dmnElementRef="_6E79E4D9-BBFB-4E90-8AA3-A6C153C3C946" />
          <kie:ComponentWidths dmnElementRef="_51ACEC3C-4207-4F5F-8FDD-9EDAA3270E60">
            <kie:width>1036</kie:width>
          </kie:ComponentWidths>
          <kie:ComponentWidths dmnElementRef="_5D050B8D-DF55-45FD-988B-9C56BED53D5B">
            <kie:width>1036</kie:width>
          </kie:ComponentWidths>
          <kie:ComponentWidths dmnElementRef="_14C44A69-56DB-4B68-B757-4225C80E4D88">
            <kie:width>1036</kie:width>
          </kie:ComponentWidths>
          <kie:ComponentWidths dmnElementRef="_0DB5DE05-A2AD-4013-B191-DC1D1637A132">
            <kie:width>1036</kie:width>
          </kie:ComponentWidths>
          <kie:ComponentWidths dmnElementRef="_3F95EFD0-94D7-4D1A-9EA9-C8E12982D7E8">
            <kie:width>1158</kie:width>
          </kie:ComponentWidths>
          <kie:ComponentWidths dmnElementRef="_A32ED4A5-7B89-40F7-BE25-CDB636FE071C">
            <kie:width>454</kie:width>
          </kie:ComponentWidths>
          <kie:ComponentWidths dmnElementRef="_D33D9AEA-49DF-489F-98EC-4B42FF8C2027">
            <kie:width>50</kie:width>
            <kie:width>300</kie:width>
          </kie:ComponentWidths>
          <kie:ComponentWidths dmnElementRef="_5F9FEA4E-B3FC-4BC2-913E-36B8071FA777">
            <kie:width>50</kie:width>
          </kie:ComponentWidths>
          <kie:ComponentWidths dmnElementRef="_4A7FC8E0-25EF-4DAF-845A-93BD89C2BC8C">
            <kie:width>120</kie:width>
          </kie:ComponentWidths>
          <kie:ComponentWidths dmnElementRef="_F0E80900-1964-4142-9A05-73E7A2E0F2CD" />
          <kie:ComponentWidths dmnElementRef="_3D0A1979-E59A-483F-BDA8-138F99BA5AB3">
            <kie:width>550</kie:width>
          </kie:ComponentWidths>
          <kie:ComponentWidths dmnElementRef="_D985F886-71C0-4F65-8808-2CEF366BECC8">
            <kie:width>550</kie:width>
          </kie:ComponentWidths>
          <kie:ComponentWidths dmnElementRef="_D1F96102-4158-45BB-8C9A-B7A3BE2C0206">
            <kie:width>672</kie:width>
          </kie:ComponentWidths>
          <kie:ComponentWidths dmnElementRef="_4ACEFFF0-AD2C-4DB8-9BAD-7BCCFB03F295">
            <kie:width>60</kie:width>
            <kie:width>133</kie:width>
            <kie:width>147</kie:width>
            <kie:width>335</kie:width>
          </kie:ComponentWidths>
          <kie:ComponentWidths dmnElementRef="_EF7F404A-939E-4889-95D8-E4053DD1EED9">
            <kie:width>60</kie:width>
            <kie:width>233</kie:width>
            <kie:width>133</kie:width>
            <kie:width>129</kie:width>
            <kie:width>135</kie:width>
            <kie:width>681</kie:width>
            <kie:width>138</kie:width>
          </kie:ComponentWidths>
          <kie:ComponentWidths dmnElementRef="_064FA88E-B06F-4944-85C3-DA86C3F660DD">
            <kie:width>150</kie:width>
          </kie:ComponentWidths>
          <kie:ComponentWidths dmnElementRef="_478C815E-60C9-4637-AA42-195DF16B63A5">
            <kie:width>50</kie:width>
            <kie:width>150</kie:width>
          </kie:ComponentWidths>
          <kie:ComponentWidths dmnElementRef="_EEDF2C15-7FD7-409F-B23B-F9A198E2135D">
            <kie:width>228</kie:width>
          </kie:ComponentWidths>
          <kie:ComponentWidths dmnElementRef="_E312D80E-0ECE-4D66-87EB-30DE20890BBC">
            <kie:width>50</kie:width>
            <kie:width>228</kie:width>
          </kie:ComponentWidths>
        </kie:ComponentsWidthsExtension>
      </di:extension>
      <dmndi:DMNShape id="dmnshape-drg-_4C89E59C-FDDA-438C-8D1F-0B1194EF6DAE" dmnElementRef="_4C89E59C-FDDA-438C-8D1F-0B1194EF6DAE" isCollapsed="false">
        <dmndi:DMNStyle>
          <dmndi:FillColor red="255" green="255" blue="255" />
          <dmndi:StrokeColor red="0" green="0" blue="0" />
          <dmndi:FontColor red="0" green="0" blue="0" />
        </dmndi:DMNStyle>
        <dc:Bounds x="980" y="360" width="134" height="61" />
        <dmndi:DMNLabel />
      </dmndi:DMNShape>
      <dmndi:DMNShape id="dmnshape-drg-_4C788DBD-C672-4F41-9AFE-9C7D2C145734" dmnElementRef="_4C788DBD-C672-4F41-9AFE-9C7D2C145734" isCollapsed="false">
        <dmndi:DMNStyle>
          <dmndi:FillColor red="255" green="255" blue="255" />
          <dmndi:StrokeColor red="0" green="0" blue="0" />
          <dmndi:FontColor red="0" green="0" blue="0" />
        </dmndi:DMNStyle>
        <dc:Bounds x="99.09345794392524" y="223.67105263157896" width="136" height="63" />
        <dmndi:DMNLabel />
      </dmndi:DMNShape>
      <dmndi:DMNShape id="dmnshape-drg-_F0DC8923-5FC7-4200-8BD1-461D5F3714BE" dmnElementRef="_F0DC8923-5FC7-4200-8BD1-461D5F3714BE" isCollapsed="false">
        <dmndi:DMNStyle>
          <dmndi:FillColor red="255" green="255" blue="255" />
          <dmndi:StrokeColor red="0" green="0" blue="0" />
          <dmndi:FontColor red="0" green="0" blue="0" />
        </dmndi:DMNStyle>
        <dc:Bounds x="531" y="225" width="136" height="62" />
        <dmndi:DMNLabel />
      </dmndi:DMNShape>
      <dmndi:DMNShape id="dmnshape-drg-_FAF9080E-F4EF-49F7-AEFD-0D2990D8FFDA" dmnElementRef="_FAF9080E-F4EF-49F7-AEFD-0D2990D8FFDA" isCollapsed="false">
        <dmndi:DMNStyle>
          <dmndi:FillColor red="255" green="255" blue="255" />
          <dmndi:StrokeColor red="0" green="0" blue="0" />
          <dmndi:FontColor red="0" green="0" blue="0" />
        </dmndi:DMNStyle>
        <dc:Bounds x="760" y="360" width="135" height="63" />
        <dmndi:DMNLabel />
      </dmndi:DMNShape>
      <dmndi:DMNShape id="dmnshape-drg-_1CF5CEFA-AF97-46F9-9CD5-9A8AEBB20B4E" dmnElementRef="_1CF5CEFA-AF97-46F9-9CD5-9A8AEBB20B4E" isCollapsed="false">
        <dmndi:DMNStyle>
          <dmndi:FillColor red="255" green="255" blue="255" />
          <dmndi:StrokeColor red="0" green="0" blue="0" />
          <dmndi:FontColor red="0" green="0" blue="0" />
        </dmndi:DMNStyle>
        <dc:Bounds x="316.0607476635514" y="361" width="134" height="61" />
        <dmndi:DMNLabel />
      </dmndi:DMNShape>
      <dmndi:DMNShape id="dmnshape-drg-_D6F4234F-15B3-4F5B-B814-5F6FF29D2907" dmnElementRef="_D6F4234F-15B3-4F5B-B814-5F6FF29D2907" isCollapsed="false">
        <dmndi:DMNStyle>
          <dmndi:FillColor red="255" green="255" blue="255" />
          <dmndi:StrokeColor red="0" green="0" blue="0" />
          <dmndi:FontColor red="0" green="0" blue="0" />
        </dmndi:DMNStyle>
        <dc:Bounds x="315" y="225" width="136" height="62" />
        <dmndi:DMNLabel />
      </dmndi:DMNShape>
      <dmndi:DMNShape id="dmnshape-drg-_2FE51DB1-3083-4BF7-AA71-0B0065310E72" dmnElementRef="_2FE51DB1-3083-4BF7-AA71-0B0065310E72" isCollapsed="false">
        <dmndi:DMNStyle>
          <dmndi:FillColor red="255" green="255" blue="255" />
          <dmndi:StrokeColor red="0" green="0" blue="0" />
          <dmndi:FontColor red="0" green="0" blue="0" />
        </dmndi:DMNStyle>
        <dc:Bounds x="980" y="220" width="136" height="62" />
        <dmndi:DMNLabel />
      </dmndi:DMNShape>
      <dmndi:DMNShape id="dmnshape-drg-_21C50763-E49F-4D83-A824-16DA6AA87C64" dmnElementRef="_21C50763-E49F-4D83-A824-16DA6AA87C64" isCollapsed="false">
        <dmndi:DMNStyle>
          <dmndi:FillColor red="255" green="255" blue="255" />
          <dmndi:StrokeColor red="0" green="0" blue="0" />
          <dmndi:FontColor red="0" green="0" blue="0" />
        </dmndi:DMNStyle>
        <dc:Bounds x="532" y="89" width="136" height="62" />
        <dmndi:DMNLabel />
      </dmndi:DMNShape>
      <dmndi:DMNShape id="dmnshape-drg-_6E3205AF-7E3D-4ABE-A367-96F3F6E8210E" dmnElementRef="_6E3205AF-7E3D-4ABE-A367-96F3F6E8210E" isCollapsed="false">
        <dmndi:DMNStyle>
          <dmndi:FillColor red="255" green="255" blue="255" />
          <dmndi:StrokeColor red="0" green="0" blue="0" />
          <dmndi:FontColor red="0" green="0" blue="0" />
        </dmndi:DMNStyle>
        <dc:Bounds x="531.1214953271028" y="360" width="134" height="61" />
        <dmndi:DMNLabel />
      </dmndi:DMNShape>
      <dmndi:DMNShape id="dmnshape-drg-_DA5CCF62-90A8-4CFC-A137-98B528522588" dmnElementRef="_DA5CCF62-90A8-4CFC-A137-98B528522588" isCollapsed="false">
        <dmndi:DMNStyle>
          <dmndi:FillColor red="255" green="255" blue="255" />
          <dmndi:StrokeColor red="0" green="0" blue="0" />
          <dmndi:FontColor red="0" green="0" blue="0" />
        </dmndi:DMNStyle>
        <dc:Bounds x="99.09345794392524" y="359" width="136" height="63" />
        <dmndi:DMNLabel />
      </dmndi:DMNShape>
      <dmndi:DMNShape id="dmnshape-drg-_C98BE939-B9C7-43E0-83E8-EE7A16C5276D" dmnElementRef="_C98BE939-B9C7-43E0-83E8-EE7A16C5276D" isCollapsed="false">
        <dmndi:DMNStyle>
          <dmndi:FillColor red="255" green="255" blue="255" />
          <dmndi:StrokeColor red="0" green="0" blue="0" />
          <dmndi:FontColor red="0" green="0" blue="0" />
        </dmndi:DMNStyle>
        <dc:Bounds x="760" y="220" width="134" height="65" />
        <dmndi:DMNLabel />
      </dmndi:DMNShape>
      <dmndi:DMNEdge id="dmnedge-drg-_89EEAF9F-5A5D-4F59-91B7-EA418A7229AF" dmnElementRef="_89EEAF9F-5A5D-4F59-91B7-EA418A7229AF">
        <di:waypoint x="383.0607476635514" y="361" />
        <di:waypoint x="599" y="287" />
      </dmndi:DMNEdge>
      <dmndi:DMNEdge id="dmnedge-drg-_87730C5A-5648-415B-9189-EF4D8805F8C9" dmnElementRef="_87730C5A-5648-415B-9189-EF4D8805F8C9">
        <di:waypoint x="598.1214953271028" y="390.5" />
        <di:waypoint x="599" y="287" />
      </dmndi:DMNEdge>
      <dmndi:DMNEdge id="dmnedge-drg-_63DE7C3B-A767-4B8A-A098-91ECB4B8D330" dmnElementRef="_63DE7C3B-A767-4B8A-A098-91ECB4B8D330">
        <di:waypoint x="827.5" y="360" />
        <di:waypoint x="599" y="287" />
      </dmndi:DMNEdge>
      <dmndi:DMNEdge id="dmnedge-drg-_2C95829D-FCF9-44F5-8F5A-0A6CDB60600D" dmnElementRef="_2C95829D-FCF9-44F5-8F5A-0A6CDB60600D">
        <di:waypoint x="827" y="252.5" />
        <di:waypoint x="667" y="256" />
      </dmndi:DMNEdge>
      <dmndi:DMNEdge id="dmnedge-drg-_77BA409B-E00D-4FBC-B522-8F656D4F6F0E" dmnElementRef="_77BA409B-E00D-4FBC-B522-8F656D4F6F0E">
        <di:waypoint x="383.0607476635514" y="391.5" />
        <di:waypoint x="383" y="287" />
      </dmndi:DMNEdge>
      <dmndi:DMNEdge id="dmnedge-drg-_4D441C11-7042-49CF-A42C-17A4348A7F29" dmnElementRef="_4D441C11-7042-49CF-A42C-17A4348A7F29">
        <di:waypoint x="167.09345794392524" y="255.17105263157896" />
        <di:waypoint x="315" y="256" />
      </dmndi:DMNEdge>
      <dmndi:DMNEdge id="dmnedge-drg-_3217D655-4484-4733-A9AE-4F9CF30D9924" dmnElementRef="_3217D655-4484-4733-A9AE-4F9CF30D9924">
        <di:waypoint x="167.09345794392524" y="359" />
        <di:waypoint x="383" y="287" />
      </dmndi:DMNEdge>
      <dmndi:DMNEdge id="dmnedge-drg-_31A1B6B2-A2A6-4E03-B898-26573A5CF3BA" dmnElementRef="_31A1B6B2-A2A6-4E03-B898-26573A5CF3BA">
        <di:waypoint x="1047" y="390.5" />
        <di:waypoint x="1048" y="282" />
      </dmndi:DMNEdge>
      <dmndi:DMNEdge id="dmnedge-drg-_0B992F01-BA77-4F06-A830-D8948B467272" dmnElementRef="_0B992F01-BA77-4F06-A830-D8948B467272">
        <di:waypoint x="599" y="256" />
        <di:waypoint x="600" y="151" />
      </dmndi:DMNEdge>
      <dmndi:DMNEdge id="dmnedge-drg-_B6002F33-4888-48C5-B265-636030F8C2DC" dmnElementRef="_B6002F33-4888-48C5-B265-636030F8C2DC" sourceElement="dmnshape-drg-_2FE51DB1-3083-4BF7-AA71-0B0065310E72" targetElement="dmnshape-drg-_21C50763-E49F-4D83-A824-16DA6AA87C64">
        <di:waypoint x="1048" y="220" />
        <di:waypoint x="600" y="151" />
      </dmndi:DMNEdge>
      <dmndi:DMNEdge id="dmnedge-drg-_A3E95B32-2EFD-40AD-B5E4-0A73A1542011" dmnElementRef="_A3E95B32-2EFD-40AD-B5E4-0A73A1542011" sourceElement="dmnshape-drg-_D6F4234F-15B3-4F5B-B814-5F6FF29D2907" targetElement="dmnshape-drg-_21C50763-E49F-4D83-A824-16DA6AA87C64">
        <di:waypoint x="383" y="225" />
        <di:waypoint x="600" y="151" />
      </dmndi:DMNEdge>
    </dmndi:DMNDiagram>
  </dmndi:DMNDI>
  <dmn:import id="_E4562608-B14C-4845-A4C3-6C1A1FBC0219" name="sumBkm" importType="https://www.omg.org/spec/DMN/20230324/MODEL/" namespace="https://kie.apache.org/dmn/_923784BD-CD31-488A-9C31-C1A83C5483C0" />
  <dmn:import id="_C726A824-9349-4CF8-91FA-F969250C8421" name="sumDiffDs" importType="https://www.omg.org/spec/DMN/20230324/MODEL/" namespace="https://kie.apache.org/dmn/_D19B0015-2CBD-4BA8-84A9-5F554D84A9E1" />
  <dmn:import id="_87CDD600-7564-CF87-547E-A8B876CD0812" name="testTreePmml" importType="https://www.dmg.org/PMML-4_2" namespace="https://kie.org/pmml#dev-webapp/available-models-to-include/testTree.pmml" />
</dmn:definitions>
`;

const meta: Meta<DmnEditorProps> = {
  title: "Use cases/Loan Pre Qualification",
  component: DmnEditor,
  includeStories: /^[A-Z]/,
};

export default meta;
type Story = StoryObj<StorybookDmnEditorProps>;

const marshaller = getMarshaller(loanPreQualificationDmn, { upgradeTo: "latest" });
const model = marshaller.parser.parse();

export const LoanPreQualification: Story = {
  ...Empty.render,
  args: {
    ...Empty.args,
    model: model,
    xml: marshaller.builder.build(model),
  },
};
