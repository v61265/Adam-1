import styled from 'styled-components'
import { useState } from 'react'
import countryOptions from 'constants/lib/countries.json'
import taiwanDisTrictOptions from 'constants/lib/taiwan-districts.json'
import DropdownMenu from './dropdown-menu'
import PrimaryButton from '../shared/buttons/primary-button'
import DefaultButton from '../shared/buttons/default-button'

const FormWrapper = styled.div``

const Title = styled.h1`
  font-size: 24px;
  font-weight: 500;
  line-height: 36px;
  margin-bottom: 24px;
  ${({ theme }) => theme.breakpoint.xl} {
    margin-bottom: 12px;
  }
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 40px;

  ${({ theme }) => theme.breakpoint.xl} {
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 2px;
    padding: 40px;
  }
`

const EmailWrapper = styled.div`
  h2 {
    font-size: 18px;
    font-weight: 500;
    line-height: 27px;
    margin-bottom: 8px;
  }

  p {
    font-size: 18px;
    font-weight: 400;
    line-height: 27px;
    color: rgba(0, 0, 0, 0.87);
  }
`

const PasswordWrapper = styled.div`
  h2 {
    font-size: 18px;
    font-weight: 500;
    line-height: 27px;
    margin-bottom: 8px;
  }
`
const PasswordButtonWrapper = styled.div`
  width: 104px;
  height: 48px;
`

const FlexRowBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  ${({ theme }) => theme.breakpoint.md} {
    display: flex;
    flex-direction: row;
    gap: 16px;
  }
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  input {
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 8px;
    padding: 12px;
    ::placeholder {
      color: rgba(0, 0, 0, 0.3);
    }
    &:active,
    &:hover {
      border: 1px solid rgba(0, 0, 0, 0.87);
    }
  }
`

const FormDetails = styled.div`
  h2 {
    font-size: 18px;
    font-weight: 500;
    line-height: 27px;
    margin-bottom: 8px;

    ${({ theme }) => theme.breakpoint.md} {
      margin-bottom: 16px;
    }
  }
`

const ItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  /* margin-bottom: 24px; */

  input {
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 8px;
    padding: 12px;
    ::placeholder {
      color: rgba(0, 0, 0, 0.3);
    }
    &:active,
    &:hover {
      border: 1px solid rgba(0, 0, 0, 0.87);
    }
  }

  ${({ theme }) => theme.breakpoint.md} {
    margin-bottom: 0;
  }
`
const AddressWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const LargeLabel = styled.label`
  font-size: 18px;
  font-weight: 500;
  line-height: 27px;
  margin-bottom: 8px;
`

const SmallLabel = styled.label`
  font-size: 14px;
  font-weight: 500;
  line-height: 28px;
  color: rgba(0, 0, 0, 0.5);
  margin-bottom: 4px;
`

const ButtonWrapper = styled.div`
  ${({ theme }) => theme.breakpoint.md} {
    width: 132px;
    height: 48px;
    margin: auto;
  }
`

const genderOptions = [
  { id: 1, name: '不透露' },
  { id: 2, name: '男' },
  { id: 3, name: '女' },
]

const monthOptions = [
  { id: 1, name: '1' },
  { id: 2, name: '2' },
  { id: 3, name: '3' },
  { id: 4, name: '4' },
  { id: 5, name: '5' },
  { id: 6, name: '6' },
  { id: 7, name: '7' },
  { id: 8, name: '8' },
  { id: 9, name: '9' },
  { id: 10, name: '10' },
  { id: 11, name: '11' },
  { id: 12, name: '12' },
]

/**
 * @returns {JSX.Element}
 */

export default function UserProfileForm() {
  const [selectedGender, setSelectedGender] = useState('')
  const [selectedMonth, setSelectedMonth] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [districtData, setDistrictData] = useState([])
  const [selectedDistrict, setSelectedDistrict] = useState('')

  const handleCountrySelect = (country) => {
    setSelectedCountry(country)
    if (country !== '台灣') {
      setSelectedCity('')
      setSelectedDistrict('')
    }
  }

  const handleCitySelect = (city) => {
    setSelectedCity(city)
    const cityData = taiwanDisTrictOptions.find(function (el) {
      return el.name === city
    })
    setDistrictData(cityData.districts)
  }

  return (
    <FormWrapper>
      <Title>個人資料</Title>
      <Form>
        <EmailWrapper>
          <h2>Email</h2>
          <p>test email</p>
        </EmailWrapper>

        <PasswordWrapper>
          <h2>密碼</h2>
          <PasswordButtonWrapper>
            <DefaultButton>變更密碼</DefaultButton>
          </PasswordButtonWrapper>
        </PasswordWrapper>

        <FlexRowBox>
          <FormGroup>
            <LargeLabel htmlFor="name">姓名</LargeLabel>
            <input id="name" placeholder="請輸入姓名" />
          </FormGroup>
          <FormGroup>
            <LargeLabel>性別</LargeLabel>
            <DropdownMenu
              keyField="id"
              value="name"
              options={genderOptions}
              selectedOption={selectedGender}
              onSelect={setSelectedGender}
            />
          </FormGroup>
        </FlexRowBox>

        <FormDetails>
          <h2>生日</h2>

          <FlexRowBox>
            <ItemsWrapper>
              <SmallLabel htmlFor="year">西元年</SmallLabel>
              <input id="year" placeholder="西元年" />
            </ItemsWrapper>
            <ItemsWrapper>
              <SmallLabel>月份</SmallLabel>
              <DropdownMenu
                options={monthOptions}
                keyField="id"
                value="name"
                selectedOption={selectedMonth}
                onSelect={setSelectedMonth}
              />
            </ItemsWrapper>
            <ItemsWrapper>
              <SmallLabel htmlFor="date">日期</SmallLabel>
              <input id="date" placeholder="日期" />
            </ItemsWrapper>
          </FlexRowBox>
        </FormDetails>

        <FormGroup>
          <LargeLabel htmlFor="phone">電話</LargeLabel>
          <input id="phone" placeholder="電話" />
        </FormGroup>
        <FormDetails>
          <h2>地址</h2>
          <AddressWrapper>
            <ItemsWrapper>
              <SmallLabel>國家</SmallLabel>
              <DropdownMenu
                options={countryOptions}
                keyField="English"
                value="Taiwan"
                selectedOption={selectedCountry}
                onSelect={handleCountrySelect}
              />
            </ItemsWrapper>
            <FlexRowBox>
              <ItemsWrapper>
                <SmallLabel htmlFor="city">縣市</SmallLabel>
                <DropdownMenu
                  options={taiwanDisTrictOptions}
                  keyField="name"
                  value="name"
                  selectedOption={selectedCity}
                  onSelect={handleCitySelect}
                  disabled={selectedCountry !== '臺灣'}
                />
              </ItemsWrapper>
              <ItemsWrapper>
                <SmallLabel htmlFor="district">行政區</SmallLabel>
                <DropdownMenu
                  options={districtData}
                  keyField="zip"
                  value="name"
                  selectedOption={selectedDistrict}
                  onSelect={setSelectedDistrict}
                  disabled={selectedCountry !== '臺灣' || selectedCity == ''}
                />
              </ItemsWrapper>
            </FlexRowBox>

            <ItemsWrapper>
              <SmallLabel htmlFor="address">詳細地址</SmallLabel>
              <input id="address" placeholder="詳細地址" />
            </ItemsWrapper>
          </AddressWrapper>
        </FormDetails>
        <ButtonWrapper>
          <PrimaryButton isLoading={false}>儲存</PrimaryButton>
        </ButtonWrapper>
      </Form>
    </FormWrapper>
  )
}
