import { recordSchema } from '@/App/schemas/recordSchema'
import InputFieldControl from '@/Core/components/common/FormControl/InputFieldControl'
import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import tw from 'twin.macro'

const RecordPage = () => {
  const {user} = useSelector((state) => state.auth)
  const {handleSubmit, control} = useForm({
    resolver: yupResolver(recordSchema)
  })

  const onSubmit = (value) => {
    console.log(value)
  }
  return (
    <Container>
      <Title>Nộp biên bản</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Info>Mã sinh viên: <Span>{user && user?.mssv}</Span></Info>
        <Info>Họ và tên: <Span>{user && user?.displayName}</Span></Info>
        <InputFieldControl label="Tên doanh nghiệp" control={control} name="companyName"/>
        
        <InputFieldControl label="Thời gian bắt đầu thực tập" control={control} name="date" type="date"/>
        <InputFieldControl label="Upload biên bản (Image, PDF hoặc Docx)" control={control} name="file" type="file"/>
      </Form>
    </Container>
  )
}

const Form = tw.form`grid gap-8`
const Title = tw.div`mb-8 text-primary text-xl font-bold`;
const Container = tw.div`container mx-auto w-[512px]`
const Info = tw.div``
const Span = tw.span`font-bold`

export default RecordPage