import { Home as homeEnum } from './../enums/home.enum';
export namespace Home {
  export interface Employee {
    id: number
    name: string
    urlImage: string
    department: homeEnum.Department
  }

  export namespace Posts {
    export interface Post {
      message: string
      date: Date | string
      likes?: number

      hearts?: number

      angry?: number

      surprise?: number

      user_reaction?: string
      [key: string]: any
    }

    export interface Timeline {
      employee: Employee
      post: Post
    }
  }
}
