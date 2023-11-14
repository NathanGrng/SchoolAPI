-- Create
    -- create user
    INSERT INTO `tbl_user`( `user_name`, `user_pwd`, `user_is_teacher`) VALUES ('[value-2]','[value-3]','[value-5]');

--Read 
    -- Get user
    SELECT `user_id`, `user_name`, `user_pwd`, `user_is_teacher` FROM `tbl_user` WHERE `user_name` = username AND `user:pwd` = pwd;
    -- get user by id
    SELECT `user_id`, `user_name`, `user_is_teacher` FROM `tbl_user` WHERE `user_id` = :id
    -- Get users
    SELECT `user_id`, `user_name`,`user_is_teacher` FROM `tbl_user`;

-- Update
    -- update user
    UPDATE `tbl_user` SET `user_name`='[value-2]',`user_is_teacher`='[value-5]' WHERE `user_id`='[value-1]';

    -- update password
    UPDATE `tbl_user` SET `user_pwd`='[value-4]' WHERE `user_id`='[value-1]';
