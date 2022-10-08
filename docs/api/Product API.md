# Product OpenAPI 사용법

___

> 경로: `/api/product/public/:queryType/:query/:dataType`  
> 타입: `GET`  
> 기능: `상품 정보를 조회합니다.`  

## 파라미터 설명
##### queryType
> 필수: true  
> 값: ["id", "title"]  
> 설명: 상품을 찾는 쿼리의 형식을 지정합니다.  
##### query
> 필수: true  
> 값: ["사용자 지정"]  
> 설명: queryType이 `id`이면 상품ID를 넣고, queryType이 `title`이면 상품 제목을 넣습니다.  
##### dataType
> 필수: true  
> 값: ["all", "productId", "title", "shortDescription", "description", "tag", "price", "createAt", "lastUpdateAt", "thumbnailImageURL", "productImageURL", "buys"]  
> 설명: 필요한 값을 지정합니다.  

## 응답 데이터 설명
```json
{
  "status": "DONE",
  "msg": "SUCCESS", 
  "data": "29604aef-c6fc-4669-b069-903a555f05b9"
}
```
##### status
> `DONE`: 요청을 성공적으로 처리했습니다.  
> `ERROR`: 요청을 처리하는 과정에서 오류가 발생했습니다.  
##### msg
> `SUCCESS`: 요청을 성공적으로 처리했습니다.  
> `INVALID_QUERY_TYPE`: 요청한 쿼리 타입이 잘못되었습니다.  
> `INVAILD_QUERY`: 요청한 쿼리로 검색된 상품이 없습니다.  
> `INVALID_DATA_TYPE`: 요청한 데이터 타입이 잘못되었습니다.  
##### data
> `성공`: 요청한 데이터가 반환됩니다.  
> `오류`: `null`이 반환됩니다.  

___
