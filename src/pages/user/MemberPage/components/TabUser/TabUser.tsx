import { useMemo } from "react";
import {
  TabUserGroup,
  TabUserItem,
  TabUserItemTitle,
  TabUserItemValue,
  TabUserItemValueNew,
  EditButtonBlock,
  EditButton,
  Message
} from "../../style";
import { MemberUser } from "../../interface";
import { INITIAL_USER_FORM, USER_FORM_KEY } from "./constants";
import { useForm } from "@/components/Form";
import { editUser } from "@/webAPI";

interface TabUserProps {
  user: MemberUser | undefined;
  editable: boolean;
}

const TabUser = ({ user, editable }: TabUserProps) => {
  const initialValue = useMemo(
    () => ({ ...INITIAL_USER_FORM, ...user }),
    [user]
  );

  const { formValue, onFromChange, formHint, resetFromHint, onSubmit } =
    useForm({
      initialValue,
      onSubmit: async (value) => {
        const res = await editUser(value);
        if (res.ok === 1) {
          location.reload();
        }
      },
      rules: [
        {
          key: USER_FORM_KEY.fullName,
          name: "全名",
          allowEmpty: false
        },
        {
          key: USER_FORM_KEY.email,
          name: "電子郵件",
          allowEmpty: false
        }
      ]
    });

  return (
    <TabUserGroup>
      <TabUserItem editable={false}>
        <TabUserItemTitle>編號</TabUserItemTitle>
        <TabUserItemValue>{user?.id}</TabUserItemValue>
        <TabUserItemValueNew editable={false} />
      </TabUserItem>
      <TabUserItem editable={false}>
        <TabUserItemTitle>帳號</TabUserItemTitle>
        <TabUserItemValue>{user?.username}</TabUserItemValue>
        <TabUserItemValueNew editable={false} />
      </TabUserItem>
      <TabUserItem editable={editable}>
        <TabUserItemTitle>全名</TabUserItemTitle>
        <TabUserItemValue>{user?.fullname}</TabUserItemValue>
        <TabUserItemValueNew
          editable={editable}
          type='text'
          placeholder='輸入新資料（必填）'
          value={formValue[USER_FORM_KEY.fullName]}
          onChange={(e) =>
            onFromChange({
              key: USER_FORM_KEY.fullName,
              value: e.target.value
            })
          }
          onFocus={() => resetFromHint(USER_FORM_KEY.fullName)}
        />
        {formHint[USER_FORM_KEY.fullName] && (
          <Message>{formHint[USER_FORM_KEY.fullName]}</Message>
        )}
      </TabUserItem>
      <TabUserItem editable={editable}>
        <TabUserItemTitle>電子郵件</TabUserItemTitle>
        <TabUserItemValue>{user?.email}</TabUserItemValue>
        <TabUserItemValueNew
          editable={editable}
          type='email'
          placeholder='輸入新資料（必填）'
          value={formValue[USER_FORM_KEY.email]}
          onChange={(e) =>
            onFromChange({
              key: USER_FORM_KEY.email,
              value: e.target.value
            })
          }
          onFocus={() => resetFromHint(USER_FORM_KEY.email)}
        />
        {formHint[USER_FORM_KEY.email] && (
          <Message>{formHint[USER_FORM_KEY.email]}</Message>
        )}
      </TabUserItem>
      <TabUserItem editable={editable}>
        <TabUserItemTitle>生日</TabUserItemTitle>
        <TabUserItemValue>
          {user?.birthday
            ? new Date(user.birthday).toLocaleDateString("zh-TW")
            : "無資料"}
        </TabUserItemValue>
        <TabUserItemValueNew
          editable={editable}
          type='date'
          placeholder='輸入新資料'
          value={formValue[USER_FORM_KEY.birthday]}
          onChange={(e) =>
            onFromChange({
              key: USER_FORM_KEY.birthday,
              value: e.target.value
            })
          }
        />
        {formHint[USER_FORM_KEY.birthday] && (
          <Message>{formHint[USER_FORM_KEY.birthday]}</Message>
        )}
      </TabUserItem>
      <TabUserItem editable={editable}>
        <TabUserItemTitle>地址</TabUserItemTitle>
        <TabUserItemValue>{user?.address}</TabUserItemValue>
        <TabUserItemValueNew
          editable={editable}
          type='text'
          placeholder='輸入新資料'
          value={formValue[USER_FORM_KEY.address]}
          onChange={(e) =>
            onFromChange({
              key: USER_FORM_KEY.address,
              value: e.target.value
            })
          }
        />
        {formHint[USER_FORM_KEY.address] && (
          <Message>{formHint[USER_FORM_KEY.address]}</Message>
        )}
      </TabUserItem>
      <EditButtonBlock>
        <EditButton type='button' onClick={onSubmit}>
          變更
        </EditButton>
      </EditButtonBlock>
    </TabUserGroup>
  );
};

export default TabUser;
