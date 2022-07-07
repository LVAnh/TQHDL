import {
    Container, SimpleGrid, Image, Flex, Heading, Text, Stack, StackDivider, Icon, useColorModeValue,
} from '@chakra-ui/react';
import {IoAnalyticsSharp} from 'react-icons/io5';
import Chart from "./chart";
import {useEffect, useState} from "react";
import api from "../api";


const Feature = ({text, icon, iconBg, onClick}) => {
    return (<Stack direction={'row'} align={'center'} onClick={onClick}>
            <Flex
                w={8}
                h={8}
                align={'center'}
                justify={'center'}
                rounded={'full'}
                bg={iconBg}>
                {icon}
            </Flex>
            <Text fontWeight={600}>{text}</Text>
        </Stack>);
};

export default function Home() {
    const [typeChart, setTypeChart] = useState(0);
    const [salesData, setSalesData] = useState([]);
    const [ageData, setAgeData] = useState([]);
    const [genderData, setGenderData] = useState([]);
    const [inventoryData, setInventoryData] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        api.get('/categories').then(res => {
            setCategories(res.data)
        })
    }, [])

    function getCategoryName(id) {
        let name = ""
        categories.forEach(cat => {
            if (cat.category_id === id) {
                name = cat.name
            }
        })
        return name
    }

    async function getInventory() {
        const res = await api.get(`/products/`)
        const result = [];
        res.data.forEach(pro => {
            result.push({
                name: pro.name,
                inventory: 1 - pro.sales / pro.quantity
            })
        })
        setInventoryData(result)
        console.log(result)
    }

    async function getAgeData() {
        const res = await api.get(`/orders/age`)
        const result = [];
        result.push({
            name: 'Dưới 15', value: res.data.filter(item => item.age < 18).length
        })
        result.push({
            name: 'Từ 15 -> 20', value: res.data.filter(item => item.age >= 15 && item.age < 20).length
        })
        result.push({
            name: 'Tù 20 -> 25', value: res.data.filter(item => item.age >= 20 && item.age < 25).length
        })
        result.push({
            name: 'Tù 25 ->30', value: res.data.filter(item => item.age >= 25 && item.age < 30).length
        })
        result.push({
            name: 'Tù 30 -> 35', value: res.data.filter(item => item.age >= 30 && item.age < 35).length
        })
        result.push({
            name: 'Trên 35', value: res.data.filter(item => item.age >= 35).length
        })
        setAgeData(result);
    }

    async function getGenderData() {
        const res = await api.get(`/orders/age`)
        const result = [];
        result.push({
            name: 'Nam', value: res.data.filter(item => item.gender === "male").length
        })
        result.push({
            name: 'Nữ', value: res.data.filter(item => item.gender === 'female').length
        })
        setGenderData(result);
    }


    function getProducts() {
        api.get(`/products/`).then(res => {
            const result = [];
            res.data.forEach(pro => {
                const index = result.findIndex(cat => cat.category_id === pro.category_id)
                if (index >= 0) {
                    result[index] = {
                        ...result[index], sales: (result[index].sales + pro.sales)
                    }
                } else {
                    result.push({
                        category_id: pro.category_id, category_name: getCategoryName(pro.category_id), sales: pro.sales
                    })
                }
            })
            setSalesData(result)
        })
    }

    return (<Container maxW={'5xl'} py={12}>
            <Flex spacing={10}>
                <Stack spacing={4} flex={2}>
                    <Text
                        textTransform={'uppercase'}
                        color={'blue.400'}
                        fontWeight={600}
                        fontSize={'sm'}
                        bg={useColorModeValue('blue.50', 'blue.900')}
                        p={2}
                        alignSelf={'flex-start'}
                        rounded={'md'}>
                        ABC company
                    </Text>
                    <Heading>Thống kê</Heading>
                    <Text color={'gray.500'} fontSize={'lg'}>
                        Thống kê cửa hàng của bạn trong ngày 07/06/2022
                    </Text>
                    <Stack
                        spacing={4}
                        divider={<StackDivider
                            borderColor={useColorModeValue('gray.100', 'gray.700')}
                        />}>
                        <Feature
                            icon={<Icon as={IoAnalyticsSharp} color={'yellow.500'} w={5} h={5}/>}
                            iconBg={useColorModeValue('yellow.100', 'yellow.900')}
                            text={'Doanh số bán theo loại'}
                            onClick={() => {
                                getProducts()
                                setTypeChart(1)
                            }}
                        />
                        <Feature
                            icon={<Icon as={IoAnalyticsSharp} color={'green.500'} w={5} h={5}/>}
                            iconBg={useColorModeValue('green.100', 'green.900')}
                            text={'Tỉ lệ tồn kho'}
                            onClick={() => {
                                getInventory()
                                getInventory()
                                setTypeChart(2)
                            }}
                        />
                        <Feature
                            icon={<Icon as={IoAnalyticsSharp} color={'purple.500'} w={5} h={5}/>}
                            iconBg={useColorModeValue('purple.100', 'purple.900')}
                            text={'Tỉ lệ khách hàng theo độ tuổi'}
                            onClick={() => {
                                setTypeChart(3)
                                getAgeData()
                                getAgeData()
                            }}
                        />
                        <Feature
                            icon={<Icon as={IoAnalyticsSharp} color={'blue.500'} w={5} h={5}/>}
                            iconBg={useColorModeValue('blue.100', 'blue.900')}
                            text={'Tỉ lệ khách hàng theo giới tính'}
                            onClick={() => {
                                setTypeChart(4)
                                getGenderData()
                                getGenderData()
                            }}
                        />
                    </Stack>
                </Stack>
                <Flex flex={3}>
                    {typeChart === 0 && <Image
                        rounded={'md'}
                        alt={'feature image'}
                        src={'https://images.unsplash.com/photo-1554200876-56c2f25224fa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'}
                        objectFit={'cover'}
                    />}
                    {typeChart === 1 && salesData.length > 0 && <Chart
                        data={salesData}
                        type={typeChart}
                    />}
                    {typeChart === 2 && inventoryData.length > 0 && <Chart
                        data={inventoryData}
                        type={typeChart}
                    />}
                    {typeChart === 3 && ageData.length > 0 && <Chart
                        data={ageData}
                        type={typeChart}
                    />}
                    {typeChart === 4 && genderData.length > 0 && <Chart
                        data={genderData}
                        type={typeChart}
                    />}
                </Flex>
            </Flex>
        </Container>);
}
