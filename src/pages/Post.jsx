import React from 'react';
import { Table } from 'react-bootstrap';

function Post(props) {
    return (
        <>
            <h1>글 목록입니다</h1>
            <Table striped bordered size="sm">
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>조회수</th>
                        <th>등록일</th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </Table>
        </>
    );
}

export default Post;